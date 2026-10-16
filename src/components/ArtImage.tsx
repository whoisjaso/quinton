import { getImageProps } from "next/image";

/**
 * Art-directed full-bleed photograph. Phones get a portrait crop sized to the screen
 * (/images/m/<name>.jpg) so the image is sharp at 3x without downloading a 3840px landscape
 * file; larger screens get the full-resolution original. Fills its positioned parent.
 */
export function ArtImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  /** sizes for screens 768px and wider */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mobileSrc = src.replace("/images/", "/images/m/");
  const common = { alt, fill: true, quality: 90, priority };
  const {
    props: { srcSet: desktopSet, ...rest },
  } = getImageProps({ ...common, src, sizes });
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: mobileSrc, sizes: "125vw" });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSet} sizes="125vw" />
      <source media="(min-width: 768px)" srcSet={desktopSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className={`object-cover ${className}`} style={{ ...rest.style, ...style }} />
    </picture>
  );
}
