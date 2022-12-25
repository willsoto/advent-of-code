from pathlib import Path

from aoc.utils import Sample


class SectionAssignment:
    first_assignment: set[int]
    second_assignment: set[int]

    def __init__(self, assignments: str) -> None:
        first, second = assignments.split(",")
        first_start, first_end = first.split("-")
        second_start, second_end = second.split("-")

        self.first_assignment = self.create_range(first_start, first_end)
        self.second_assignment = self.create_range(second_start, second_end)

    def __repr__(self) -> str:
        return "%s, %s" % (self.first_assignment, self.second_assignment)

    def create_range(self, start: str, end: str) -> set[int]:
        return set([i for i in range(int(start), int(end) + 1)])

    def completely_overlaps(self) -> bool:
        return self.first_assignment.issubset(
            self.second_assignment
        ) or self.second_assignment.issubset(self.first_assignment)

    def overlap(self) -> set[int]:
        return self.first_assignment & self.second_assignment


def part_1() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))
    section_assignments = [SectionAssignment(line) for line in sample.lines]

    total: int = 0
    for assignment in section_assignments:
        if assignment.completely_overlaps():
            total += 1

    return total


def part_2() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))
    section_assignments = [SectionAssignment(line) for line in sample.lines]

    total: int = 0
    for assignment in section_assignments:
        overlap = assignment.overlap()

        if len(overlap) > 0:
            total += 1

    return total
