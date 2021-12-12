from typing import List, Tuple

from ..utils import open_input
from .input import NUMBERS_TO_DRAW
from .models import BingoBoard


def parse_bingo_boards() -> List[BingoBoard]:
    lines = open_input(__file__).readlines()

    raw_group: List[str] = []
    groups: List[List[str]] = []
    for index, line in enumerate(lines):
        # Fixes an issue I was having where the last board was not being
        # processed because the last line of the file wasn't being read in.
        # Probably something I am doing wrong but whatever.
        last_line = index == len(lines) - 1

        if last_line:
            raw_group.append(line)

        if line.strip() == "" or last_line:
            groups.append(raw_group)
            raw_group = []
            continue

        raw_group.append(line)

    boards: List[BingoBoard] = []
    for group in groups:
        rows: List[List[str]] = []

        for row in group:
            row = list(filter(lambda cell: cell != "", row.strip().split(" ")))
            rows.append(row)

        boards.append(BingoBoard(rows))

    assert len(groups) == len(boards)

    return boards


def find_winning_board_and_number(
    boards: List[BingoBoard],
) -> Tuple[BingoBoard, int]:
    for number in NUMBERS_TO_DRAW:
        for board in boards:
            board.play_number(number)

            if board.is_winner:
                return (board, number)


def part_1() -> int:
    boards = parse_bingo_boards()
    (winning_board, winning_number) = find_winning_board_and_number(boards)

    sum_unmarked = sum(winning_board.unmarked_members)
    result = winning_number * sum_unmarked

    return result


def part_2():
    pass
