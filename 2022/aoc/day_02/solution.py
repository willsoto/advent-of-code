from aoc.utils import Sample
from pathlib import Path
from enum import Enum


class Action(Enum):
    ROCK = "A"
    PAPER = "B"
    SCISSOR = "C"

    def __repr__(self) -> str:
        return self.name

    @staticmethod
    def from_letter(letter: str):
        if letter == "A" or letter == "X":
            return Action["ROCK"]
        elif letter == "B" or letter == "Y":
            return Action["PAPER"]
        elif letter == "C" or letter == "Z":
            return Action["SCISSOR"]

        raise Exception("Unknown letter: %s".format(letter))


class Outcome(Enum):
    LOSE = "X"
    DRAW = "Y"
    WIN = "Z"

    def __repr__(self) -> str:
        return self.name

    @staticmethod
    def from_letter(letter: str):
        if letter == "X":
            return Outcome.LOSE
        elif letter == "Y":
            return Outcome.DRAW
        elif letter == "Z":
            return Outcome.WIN

        raise Exception("Unknown letter: %s".format(letter))


def choice_score(choice: Action) -> int:
    if choice == Action.ROCK:
        return 1
    elif choice == Action.PAPER:
        return 2
    elif choice == Action.SCISSOR:
        return 3

    raise Exception("Unknown choice")


class RockPaperScissorRoundPart1:
    opponent: Action
    me: Action

    def __init__(self, round: str) -> None:
        moves = round.split(" ")

        self.opponent = Action.from_letter(moves[0])
        self.me = Action.from_letter(moves[1])

    def __repr__(self) -> str:
        return "%s".format(self.round_score())

    def round_score(self) -> int:
        return self.outcome_score() + choice_score(self.me)

    def outcome_score(self) -> int:
        if self.opponent == Action.ROCK:
            if self.me == Action.ROCK:
                return 3
            elif self.me == Action.PAPER:
                return 6
            elif self.me == Action.SCISSOR:
                return 0
        elif self.opponent == Action.PAPER:
            if self.me == Action.ROCK:
                return 0
            elif self.me == Action.PAPER:
                return 3
            elif self.me == Action.SCISSOR:
                return 6
        elif self.opponent == Action.SCISSOR:
            if self.me == Action.ROCK:
                return 6
            elif self.me == Action.PAPER:
                return 0
            elif self.me == Action.SCISSOR:
                return 3

        raise Exception("Unknown combination of plays")


class RockPaperScissorRoundPart2:
    opponent: Action
    outcome: Outcome
    me: Action

    def __init__(self, round: str) -> None:
        moves = round.split(" ")

        self.opponent = Action.from_letter(moves[0])
        self.outcome = Outcome.from_letter(moves[1])
        self.me = self.get_appropriate_counter()

    def round_score(self) -> int:
        return self.outcome_score() + choice_score(self.me)

    def outcome_score(self) -> int:
        if self.outcome == Outcome.DRAW:
            return 3
        elif self.outcome == Outcome.LOSE:
            return 0
        else:
            return 6

    def get_appropriate_counter(self) -> Action:
        if self.outcome == Outcome.LOSE:
            if self.opponent == Action.ROCK:
                return Action.SCISSOR
            elif self.opponent == Action.PAPER:
                return Action.ROCK
            elif self.opponent == Action.SCISSOR:
                return Action.PAPER
        elif self.outcome == Outcome.WIN:
            if self.opponent == Action.ROCK:
                return Action.PAPER
            elif self.opponent == Action.PAPER:
                return Action.SCISSOR
            elif self.opponent == Action.SCISSOR:
                return Action.ROCK

        # Draw case. Just match opponent.
        return self.opponent


def part_1() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))
    rounds = [RockPaperScissorRoundPart1(line) for line in sample.lines]

    total = 0
    for round in rounds:
        total += round.round_score()

    return total


def part_2() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))
    rounds = [RockPaperScissorRoundPart2(line) for line in sample.lines]

    total = 0
    for round in rounds:
        total += round.round_score()

    return total
