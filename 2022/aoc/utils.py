from pathlib import Path


class Sample:
    contents: list[str] = []

    def __init__(self, path: Path) -> None:
        file = open(path, "r")

        self.contents = file.read().splitlines()

    def print(self):
        print(self.contents)