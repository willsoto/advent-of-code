from ..utils import open_input


def part_1():
    reader = open_input(__file__).readlines()
    previous_depth = None
    total_larger = 0

    for line in reader:
        depth = int(line.strip())

        if not previous_depth:
            previous_depth = depth
            continue

        if depth > previous_depth:
            total_larger = total_larger + 1

        previous_depth = depth

    assert total_larger == 1228


def part_2():
    reader = open_input(__file__).readlines()
    window_size = 3
    previous_depth = None
    total_larger = 0

    depths = [int(line.strip()) for line in reader]

    print(depths)
    for i in range(len(depths) - window_size + 1):
        start = i
        end = i + window_size
        depth = sum(depths[start:end])

        if not previous_depth:
            previous_depth = depth
            continue

        if depth > previous_depth:
            total_larger = total_larger + 1

        previous_depth = depth

    assert total_larger == 1257
