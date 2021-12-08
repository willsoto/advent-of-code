from io import TextIOWrapper
from os import path


def open_input(relative_to: str, name: str = "input.txt") -> TextIOWrapper:
    file_path = path.join(path.dirname(relative_to), name)

    return open(file_path, "r")
