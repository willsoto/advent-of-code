from collections import defaultdict
from pathlib import Path
from typing import List

from aoc.utils import Sample


def get_file_sizes() -> defaultdict[str, int]:
    sample = Sample(Path(__file__))
    current_path: List[str] = []
    sizes: defaultdict[str, int] = defaultdict(int)

    for line in sample.lines:
        if line.startswith("$ ls") or line.startswith("dir"):
            continue

        if line.startswith("$ cd"):
            name = line.split(" ").pop().strip()

            if name == "..":
                current_path.pop()
            else:
                current_path.append(name)
        else:
            # Must be a file
            size = line.split(" ")[0]

            for i in range(len(current_path)):
                directory = "/".join(current_path[: i + 1]).replace("//", "/")
                sizes[directory] += int(size)

    return sizes


def part_1() -> int:
    sizes = get_file_sizes()

    small_directories = {
        directory: size for (directory, size) in sizes.items() if size <= 100000
    }

    return sum(small_directories.values())


def part_2() -> int:
    sizes = get_file_sizes()

    total_disk_space = 70000000
    needed_disk_space = 30000000
    min_space_to_free = sizes["/"] + needed_disk_space - total_disk_space

    candidate_directories = {
        directory: size
        for (directory, size) in sizes.items()
        if size >= min_space_to_free
    }

    return min(candidate_directories.values())
