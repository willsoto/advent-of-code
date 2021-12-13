from aoc import day_4


class TestDay4:
    def test_part_1(self):
        result = day_4.part_1()

        assert result == 74320

    def test_part_2(self):
        result = day_4.part_2()

        assert result == 17884
