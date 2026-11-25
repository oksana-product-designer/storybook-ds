import tokensCss from '../tokens/tokens.css?raw';

export type Token = {
  name: string;
  value: string;
  note?: string;
};

const LINE = /^\s*(--[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/;

/** Every custom property declared in src/tokens/tokens.css, in file order. */
export const tokens: Token[] = tokensCss
  .split('\n')
  .map((line) => LINE.exec(line))
  .filter((m): m is RegExpExecArray => m !== null)
  .map((m) => ({ name: m[1], value: m[2].trim(), note: m[3] }));

export const byPrefix = (prefix: string): Token[] =>
  tokens.filter((t) => t.name.startsWith(prefix));
