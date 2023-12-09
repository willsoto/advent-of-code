package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Maps;
import com.google.common.collect.Range;
import com.google.common.collect.RangeMap;
import com.google.common.collect.Table;
import com.google.common.collect.TreeRangeMap;
import com.willsoto.aoc.utils.Characters;
import com.willsoto.aoc.utils.Input;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import org.junit.jupiter.api.Assertions;

public class DayThree {
  private static final Pattern digits = Pattern.compile("(\\d+)");

  public static void main(String[] args) {
    final var input = new Input("day_three.txt");
    final var lines = input.lines();

    final Map<Integer, RangeMap<Integer, Integer>> rangesByRowNumber =
        numberRangesByRowNumber(lines);

    final Table<Integer, Integer, String> table = buildCharacterTable(input);

    Assertions.assertEquals(539590, getTotalPartOne(lines, rangesByRowNumber, table));
    Assertions.assertEquals(80703636, getTotalPartTwo(lines, rangesByRowNumber, table));
  }

  private static Integer getTotalPartOne(
      final List<String> lines,
      final Map<Integer, RangeMap<Integer, Integer>> rangesByRowNumber,
      final Table<Integer, Integer, String> table) {
    int total = 0;
    for (int row = 0; row < lines.size(); row++) {
      for (int column = 0; column < lines.get(row).length(); column++) {
        final var current = table.get(row, column);

        if (!isSymbol(current)) {
          continue;
        }

        final HashSet<Integer> visitedNumbers = new HashSet<>();
        // Check surroundings for numbers...
        for (int k = -1; k <= 1; k++) {
          for (int l = -1; l <= 1; l++) {
            final var surroundingRow = row + k;
            final var surroundingColumn = column + l;
            final var result = table.get(surroundingRow, surroundingColumn);

            if (Characters.isInteger(result)) {
              final RangeMap<Integer, Integer> numbersInRow = rangesByRowNumber.get(surroundingRow);
              final Integer numberInRange = numbersInRow.get(surroundingColumn);
              // Assumes the same number won't be touched more than once by the same symbol...yolo
              visitedNumbers.add(numberInRange);
            }
          }
        }

        total += visitedNumbers.stream().reduce(0, Integer::sum);
      }
    }

    return total;
  }

  private static Integer getTotalPartTwo(
      final List<String> lines,
      final Map<Integer, RangeMap<Integer, Integer>> rangesByRowNumber,
      final Table<Integer, Integer, String> table) {
    int total = 0;
    for (int row = 0; row < lines.size(); row++) {
      for (int column = 0; column < lines.get(row).length(); column++) {
        final var current = table.get(row, column);

        if (!isAsteriskSymbol(current)) {
          continue;
        }

        final HashSet<Integer> visitedNumbers = new HashSet<>();
        // Check surroundings for numbers...
        for (int k = -1; k <= 1; k++) {
          for (int l = -1; l <= 1; l++) {
            final var surroundingRow = row + k;
            final var surroundingColumn = column + l;
            final var result = table.get(surroundingRow, surroundingColumn);

            if (Characters.isInteger(result)) {
              final RangeMap<Integer, Integer> numbersInRow = rangesByRowNumber.get(surroundingRow);
              final Integer numberInRange = numbersInRow.get(surroundingColumn);
              // Assumes the same number won't be touched more than once by the same symbol...yolo
              visitedNumbers.add(numberInRange);
            }
          }
        }

        if (visitedNumbers.size() == 2) {
          total += visitedNumbers.stream().reduce(1, (a, b) -> a * b);
        }
      }
    }

    return total;
  }

  private static boolean isSymbol(final String character) {
    return character != null
        && !character.equals(".")
        && Characters.safeParseInt(character) == null;
  }

  private static boolean isAsteriskSymbol(final String character) {
    return isSymbol(character) && character.equals("*");
  }

  private static Table<Integer, Integer, String> buildCharacterTable(final Input input) {
    final var lines = input.lines();
    final Table<Integer, Integer, String> table = HashBasedTable.create();

    for (int i = 0; i < lines.size(); i++) {
      final var line = lines.get(i);
      final var characters = Splitter.fixedLength(1).splitToList(line);

      for (int j = 0; j < characters.size(); j++) {
        table.put(i, j, characters.get(j));
      }
    }

    return table;
  }

  private static Map<Integer, RangeMap<Integer, Integer>> numberRangesByRowNumber(
      final List<String> lines) {
    final Map<Integer, RangeMap<Integer, Integer>> rangesByRowNumber = Maps.newHashMap();

    for (int row = 0; row < lines.size(); row++) {
      final RangeMap<Integer, Integer> rangeMap = TreeRangeMap.create();
      final var line = lines.get(row);
      final var matcher = digits.matcher(line);

      while (matcher.find()) {
        final var start = matcher.start();
        final var group = matcher.group();
        final var end = matcher.end();

        rangeMap.put(Range.closed(start, end), Integer.parseInt(group));
      }
      rangesByRowNumber.put(row, rangeMap);
    }

    return rangesByRowNumber;
  }
}
