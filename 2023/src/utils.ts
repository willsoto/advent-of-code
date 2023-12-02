import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";

export class DefaultMap<K, V> extends Map<K, V> {
  #defaultValue: V;

  constructor(defaultValue: V) {
    super();

    this.#defaultValue = defaultValue;
  }

  public override get(key: K): V {
    if (super.has(key)) {
      return super.get(key) as V;
    }
    super.set(key, this.#defaultValue);
    return this.get(key);
  }
}

export class Input {
  #text: string;

  /**
   * @param importUrl Should always be `import.meta.url`
   */
  constructor(importUrl: string, name = "input.txt") {
    this.#text = fs
      .readFileSync(
        path.resolve(path.dirname(fileURLToPath(importUrl)), name),
        "utf-8",
      )
      // Remove any trailing newlines
      .trim();
  }

  public lines(): string[] {
    return this.#text.split("\n").map((line) => line.trim());
  }
}
