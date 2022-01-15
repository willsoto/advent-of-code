import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";

export function openInput(importUrl: string, name = "input.txt"): string {
  return (
    fs
      .readFileSync(
        path.resolve(path.dirname(fileURLToPath(importUrl)), name),
        "utf-8",
      )
      // Remove any trailing newlines
      .trim()
  );
}

export function pairwise(iterable: string): Generator<string, void, unknown>;
export function* pairwise<T>(iterable: T[] | string) {
  const windowSize = 2;

  for (let index = 0; index < iterable.length; index++) {
    const start = index;
    const end = index + windowSize;
    const slice = iterable.slice(start, end);

    if (slice.length === windowSize) {
      yield iterable.slice(start, end);
    }
  }
}

/**
 * Modeled after Python's `defaultdict`
 * @see https://docs.python.org/3/library/collections.html#collections.defaultdict
 */
export class DefaultMap<K, V> extends Map<K, V> {
  #defaultValue: V;

  constructor(defaultValue: V) {
    super();

    this.#defaultValue = defaultValue;
  }

  get(key: K): V {
    if (super.has(key)) {
      return super.get(key) as V;
    }
    return this.#defaultValue;
  }
}
