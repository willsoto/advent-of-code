import collections
from enum import Enum
from typing import List, Tuple, TypeAlias

from ..utils import open_input

Diagnostics: TypeAlias = List[str]


class DiagnosticType(Enum):
    OXYGEN = 1
    C02 = 2


def part_1() -> int:
    reader = open_input(__file__).readlines()
    diagnostics = [line.strip() for line in reader]

    gamma_rate_binary: str = ""
    epsilon_rate_binary: str = ""

    for diagnostic in zip(*diagnostics):
        # Contains tuples that look like: (value, occurences)
        most_common, least_common = collections.Counter(
            diagnostic
        ).most_common()

        gamma_rate_binary += most_common[0]
        epsilon_rate_binary += least_common[0]

    gamma_rate = int(gamma_rate_binary, 2)
    epsilon_rate = int(epsilon_rate_binary, 2)

    power_consumption = gamma_rate * epsilon_rate

    return power_consumption


def part_2() -> int:
    reader = open_input(__file__).readlines()
    diagnostics = [line.strip() for line in reader]

    oxygen_generator_ratings = diagnostics
    for index in range(12):
        if len(oxygen_generator_ratings) == 1:
            break

        oxygen_generator_ratings = filter_diagnostics(
            oxygen_generator_ratings, index, DiagnosticType.OXYGEN
        )

    c02_scrubber_ratings = diagnostics
    for index in range(12):
        if len(c02_scrubber_ratings) == 1:
            break

        c02_scrubber_ratings = filter_diagnostics(
            c02_scrubber_ratings, index, DiagnosticType.C02
        )

    (oxygen_generator_rating,) = oxygen_generator_ratings
    (c02_scrubber_rating,) = c02_scrubber_ratings

    life_support_rating = int(oxygen_generator_rating, 2) * int(
        c02_scrubber_rating, 2
    )

    return life_support_rating


def filter_diagnostics(
    diagnostics: Diagnostics,
    index: int,
    type: DiagnosticType,
) -> Diagnostics:
    counts = get_diagnostic_counts(diagnostics)

    (most_common, least_common) = counts[index]
    (most_common_value, most_common_count) = most_common
    (least_common_value, least_common_count) = least_common

    value = None
    if most_common_count == least_common_count:
        if type == DiagnosticType.OXYGEN:
            value = "1"
        else:
            value = "0"
    elif type == DiagnosticType.OXYGEN:
        value = most_common_value
    else:
        value = least_common_value

    results = filter_diagnostics_by_bit(diagnostics, value, index)

    return results


def filter_diagnostics_by_bit(
    diagnostics: Diagnostics, bit: int, index: int
) -> Diagnostics:
    filtered: Diagnostics = []

    for diagnostic in diagnostics:
        if diagnostic[index] and diagnostic[index] == bit:
            filtered.append(diagnostic)

    return filtered


def get_diagnostic_counts(
    diagnostics: Diagnostics,
) -> List[List[Tuple[str, int]]]:
    diagnostic_counts: List[List[Tuple[str, int]]] = []

    for diagnostic in zip(*diagnostics):
        # Contains tuples that look like: (value, occurences)
        counts = collections.Counter(diagnostic).most_common()
        diagnostic_counts.append(counts)

    return diagnostic_counts
