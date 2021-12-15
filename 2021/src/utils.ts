import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";

export function openInput(importUrl: string, name = "input.txt"): string {
  return fs.readFileSync(
    path.resolve(path.dirname(fileURLToPath(importUrl)), name),
    "utf-8",
  );
}
