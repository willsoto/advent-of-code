from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

from aoc.utils import Sample

Grid = Dict[Tuple[int, int], "Tree"]


@dataclass(kw_only=True)
class Tree:
    height: int
    heights_above: List[int]
    heights_below: List[int]
    heights_right: List[int]
    heights_left: List[int]

    @property
    def is_visible(self) -> bool:
        return any(
            (
                self.visible_above,
                self.visible_below,
                self.visible_right,
                self.visible_left,
            )
        )

    @property
    def visible_above(self) -> bool:
        if len(self.heights_above) == 0:
            return True

        return self.height > max(self.heights_above)

    @property
    def visible_below(self) -> bool:
        if len(self.heights_below) == 0:
            return True

        return self.height > max(self.heights_below)

    @property
    def visible_right(self) -> bool:
        if len(self.heights_right) == 0:
            return True

        return self.height > max(self.heights_right)

    @property
    def visible_left(self) -> bool:
        if len(self.heights_left) == 0:
            return True

        return self.height > max(self.heights_left)

    @property
    def scenic_score(self) -> int:
        viewing_distance_above: int = self.compute_score(self.heights_above)
        viewing_distance_below: int = self.compute_score(self.heights_below)
        viewing_distance_right: int = self.compute_score(self.heights_right)
        viewing_distance_left: int = self.compute_score(self.heights_left)

        return (
            viewing_distance_above
            * viewing_distance_below
            * viewing_distance_right
            * viewing_distance_left
        )

    def compute_score(self, heights: List[int]) -> int:
        score: int = 0
        for height in heights:
            if self.height > height:
                score += 1
            elif self.height <= height:
                score += 1
                break

        return score


# yolo
def make_grid() -> Grid:
    sample = Sample(Path(__file__))

    total_height = len(sample.lines)
    total_width = len(sample.lines[0])

    height_grid: Dict[Tuple[int, int], int] = dict()
    for row_index, line in enumerate(sample.lines):
        row = [int(height) for height in [*line]]

        for column_index, height in enumerate(row):
            height_grid[(row_index, column_index)] = height

    grid: Grid = dict()
    for coordinates in height_grid:
        x, y = coordinates
        height = height_grid[coordinates]

        heights_above: List[int] = []
        heights_below: List[int] = []
        for i in range(1, total_height):
            above = height_grid.get((x - i, y))
            if above is not None:
                heights_above.append(above)

            below = height_grid.get((x + i, y))
            if below is not None:
                heights_below.append(below)

        heights_left: List[int] = []
        heights_right: List[int] = []
        for i in range(1, total_width):
            left = height_grid.get((x, y - i))
            if left is not None:
                heights_left.append(left)

            right = height_grid.get((x, y + i))
            if right is not None:
                heights_right.append(right)

        grid[(x, y)] = Tree(
            height=height,
            heights_above=heights_above,
            heights_below=heights_below,
            heights_left=heights_left,
            heights_right=heights_right,
        )

    return grid


def part_1() -> int:
    grid = make_grid()

    visible: int = 0
    for coordinates in grid:
        x, y = coordinates
        tree = grid.get((x, y))
        assert tree is not None

        if tree.is_visible:
            visible += 1

    return visible


def part_2() -> int:
    grid = make_grid()

    scenic_scores: List[int] = []
    for coordinates in grid:
        tree = grid.get(coordinates)
        assert tree is not None

        scenic_scores.append(tree.scenic_score)

    return max(scenic_scores)
