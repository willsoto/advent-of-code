from typing import Dict, List, TypeAlias, Union

Board: TypeAlias = List[List[str]]


class BoardMember:
    def __init__(self, members: List[str], type: str) -> None:
        self.members: List[int] = [int(member) for member in members]
        self.type = type

        self.state: Dict[int, bool] = {}
        for member in self.members:
            self.state[member] = False

    def __repr__(self) -> str:
        return "BoardMember({0}, {1})".format(self.type, self.debug())

    def play_number(self, number: int) -> None:
        for member in self.members:
            if member == number:
                self.state[member] = True

    @property
    def marked_members(self) -> List[int]:
        return list(
            filter(
                lambda member: self.state[member] is True, self.state.keys()
            )
        )

    @property
    def unmarked_members(self) -> List[int]:
        return list(
            filter(
                lambda member: self.state[member] is False, self.state.keys()
            )
        )

    @property
    def is_winner(self) -> bool:
        return all(self.state.values())

    def debug(self) -> List[int]:
        return self.members


class BingoBoard:
    _rows: List[BoardMember] = []
    _columns: List[BoardMember] = []

    def __init__(self, board: Board) -> None:
        self.board = board

    def __repr__(self) -> str:
        return "BingoBoard({0})".format(self.debug())

    @property
    def rows(self) -> List[BoardMember]:
        if len(self._rows) > 0:
            return self._rows

        self._rows = [BoardMember(row, "row") for row in self.board]

        return self._rows

    @property
    def columns(self) -> List[BoardMember]:
        if len(self._columns) > 0:
            return self._columns

        self._columns = [
            BoardMember(column, "column") for column in zip(*self.board)
        ]

        return self._columns

    @property
    def board_numbers(self) -> List[int]:
        numbers: List[int] = []

        for row in self.rows:
            numbers = numbers + row.members

        return numbers

    @property
    def board_members(self) -> List[BoardMember]:
        return self.rows + self.columns

    def play_number(self, number: int) -> None:
        if self.is_winner:
            return None

        for member in self.board_members:
            member.play_number(number)

    @property
    def winning_member(self) -> Union[BoardMember, None]:
        if self.row_winner is not None:
            return self.row_winner
        elif self.column_winner is not None:
            return self.column_winner

        return None

    @property
    def is_winner(self) -> bool:
        return self.winning_member is not None

    @property
    def row_winner(self) -> Union[BoardMember, None]:
        for row in self.rows:
            if row.is_winner:
                return row

        return None

    @property
    def column_winner(self) -> Union[BoardMember, None]:
        for column in self.columns:
            if column.is_winner:
                return column

        return None

    @property
    def marked_members(self) -> List[int]:
        marked: List[int] = []

        for row in self.rows:
            marked = marked + row.marked_members

        return marked

    @property
    def unmarked_members(self) -> List[int]:
        unmarked: List[int] = []

        for row in self.rows:
            unmarked = unmarked + row.unmarked_members

        return unmarked

    def debug(self) -> None:
        return [row.debug() for row in self.rows]
