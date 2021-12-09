from aoc import day_2


class TestDay2:
    def test_part_1(self):
        result = day_2.part_1()

        assert result == 1762050

    def test_part_2(self):
        result = day_2.part_2()

        assert result == 1855892637
