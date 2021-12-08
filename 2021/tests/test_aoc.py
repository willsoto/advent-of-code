from aoc import __version__
from aoc import day_1, day_2


def test_version():
    assert __version__ == "0.1.0"


def test_day_1():
    day_1.part_1()
    day_1.part_2()


def test_day_2():
    day_2.part_1()
    day_2.part_2()
