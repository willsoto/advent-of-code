import re
from collections import OrderedDict
from pathlib import Path

from aoc.utils import Sample


def make_stacks() -> OrderedDict[int, list[str]]:
    stack_1 = ["N", "R", "G", "P"]
    stack_2 = ["J", "T", "B", "L", "F", "G", "D", "C"]
    stack_3 = ["M", "S", "V"]
    stack_4 = ["L", "S", "R", "C", "Z", "P"]
    stack_5 = ["P", "S", "L", "V", "C", "W", "D", "Q"]
    stack_6 = ["C", "T", "N", "W", "D", "M", "S"]
    stack_7 = ["H", "D", "G", "W", "P"]
    stack_8 = ["Z", "L", "P", "H", "S", "C", "M", "V"]
    stack_9 = ["R", "P", "F", "L", "W", "G", "Z"]

    stacks: OrderedDict[int, list[str]] = OrderedDict(
        [
            (1, stack_1),
            (2, stack_2),
            (3, stack_3),
            (4, stack_4),
            (5, stack_5),
            (6, stack_6),
            (7, stack_7),
            (8, stack_8),
            (9, stack_9),
        ]
    )

    return stacks


regex = re.compile("move (\\d+) from (\\d+) to (\\d+)")


class Instruction:
    count: int
    from_stack: int
    to_stack: int

    def __init__(self, instruction: str) -> None:
        matches = regex.findall(instruction)
        assert len(matches) == 1

        count, from_stack, to_stack = matches[0]

        self.count = int(count)
        self.from_stack = int(from_stack)
        self.to_stack = int(to_stack)

    def __repr__(self) -> str:
        return "Count(%i), FromStack(%i), ToStack(%i)" % (
            self.count,
            self.from_stack,
            self.to_stack,
        )


def part_1() -> str:
    sample = Sample(Path(__file__))
    instructions = [Instruction(line) for line in sample.lines]
    stacks = make_stacks()

    for instruction in instructions:
        for _ in range(instruction.count):
            stack = stacks[instruction.from_stack].pop()

            stacks[instruction.to_stack].append(stack)

    top_crates: str = ""
    for stack in stacks.values():
        top_crates += stack.pop()

    return top_crates


def part_2() -> str:
    sample = Sample(Path(__file__))
    instructions = [Instruction(line) for line in sample.lines]
    stacks = make_stacks()

    for instruction in instructions:
        crates = stacks[instruction.from_stack][-instruction.count :]
        del stacks[instruction.from_stack][-instruction.count :]

        stacks[instruction.to_stack].extend(crates)

    top_crates: str = ""
    for crates in stacks.values():
        top_crates += crates.pop()

    return top_crates
