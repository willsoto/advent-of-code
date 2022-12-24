from pathlib import Path


class Sample:
    lines: list[str] = []

    def __init__(self, path: Path) -> None:
        file = open(path, "r")

        self.lines = file.read().splitlines()

    def print(self):
        print(self.lines)

    def as_ints(self) -> list[int]:
        return [int(line) for line in self.lines]
