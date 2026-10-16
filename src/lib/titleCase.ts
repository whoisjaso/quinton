/*
  Title Case for headings. Every word is capitalized except short
  articles, conjunctions and prepositions in the middle of a line,
  which is the standard used in premium brand typography.
*/
const minor = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "per", "the", "to", "vs", "via",
]);

export function titleCase(input: string): string {
  const words = input.split(" ");
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      const isEdge = i === 0 || i === words.length - 1;
      const afterStop = i > 0 && /[.:?!]$/.test(words[i - 1]);
      if (!isEdge && !afterStop && minor.has(lower.replace(/[^a-z]/g, ""))) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/** Applies titleCase to strings and leaves React nodes untouched. */
export function tc<T>(node: T): T {
  return (typeof node === "string" ? titleCase(node) : node) as T;
}
