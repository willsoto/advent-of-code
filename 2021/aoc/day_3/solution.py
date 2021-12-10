from ..utils import open_input
import collections


def part_1() -> int:
    reader = open_input(__file__).readlines()
    parsed_lines = [line.strip() for line in reader]

    gamma_rate_binary: str = ""
    epsilon_rate_binary: str = ""

    for line in zip(*parsed_lines):
        # Contains tuples that look like: (value, occurences)
        most_common_bit, least_common_bit = collections.Counter(
            line).most_common()

        gamma_rate_binary += most_common_bit[0]
        epsilon_rate_binary += least_common_bit[0]

    gamma_rate = int(gamma_rate_binary, 2)
    epsilon_rate = int(epsilon_rate_binary, 2)

    power_consumption = gamma_rate * epsilon_rate

    return power_consumption


def part_2():
    pass
