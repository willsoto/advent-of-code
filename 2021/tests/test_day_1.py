from aoc import day_1


class TestDay1:
    def test_part_1(self):
        result = day_1.part_1()

        assert result == 1228

    def test_part_2(self):
        result = day_1.part_2()

        assert result == 1257
