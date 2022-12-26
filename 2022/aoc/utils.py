import pprint
from pathlib import Path
from typing import Generator


class Sample:
    lines: list[str] = []

    def __init__(self, path: Path, name: str = "sample.txt") -> None:
        file = open(path.with_name(name), "r")

        self.lines = file.read().splitlines()

    def print(self):
        pprint.pprint(self.lines)

    def as_ints(self) -> list[int]:
        return [int(line) for line in self.lines]

    def characters(self) -> list[str]:
        assert len(self.lines) == 1

        return [*self.lines[0]]

    def sliding_window(
        self, window_size: int
    ) -> Generator[list[str], list[str], list[str]]:
        if len(self.lines) <= window_size:
            return self.lines

        for index in range(len(self.lines) - window_size + 1):
            yield self.lines[index : index + window_size]

        return []

    def partition(self, size: int) -> Generator[list[str], list[str], list[str]]:
        for index in range(0, len(self.lines), size):
            yield self.lines[index : index + size]

        return []
