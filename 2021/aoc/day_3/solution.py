from ..utils import open_input
from statistics import mode


def part_1() -> int:
    reader = open_input(__file__).readlines()
    parsed_lines = [line.strip() for line in reader]

    gamma_rate_binary: str = ""
    epsilon_rate_binary: str = ""

    for line in zip(*parsed_lines):
        most_common_bit = mode(line)

        gamma_rate_binary += most_common_bit

        if most_common_bit == "1":
            epsilon_rate_binary += "0"
        else:
            epsilon_rate_binary += "1"

    gamma_rate = int(gamma_rate_binary, 2)
    epsilon_rate = int(epsilon_rate_binary, 2)

    power_consumption = gamma_rate * epsilon_rate

    return power_consumption


def part_2():
    pass
