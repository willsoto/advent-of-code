package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.ImmutableMap;
import com.willsoto.aoc.utils.Input;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Assertions;

public class DayOne {
  private static final Map<String, String> replacements =
      ImmutableMap.<String, String>builder()
          .put("one", "o1e")
          .put("two", "t2o")
          .put("three", "t3e")
          .put("four", "f4r")
          .put("five", "f5e")
          .put("six", "s6x")
          .put("seven", "s7n")
          .put("eight", "e8t")
          .put("nine", "n9e")
          .build();

  public static void main(final String[] args) {
    final var input = new Input("day_one.txt");

    final var partOneResult =
        input.lines().stream()
            .map(line -> Splitter.fixedLength(1).trimResults().splitToList(line))
            .map(
                characters -> {
                  final var firstNumber = findNumber(characters);
                  final var lastNumber = findNumber(characters.reversed());

                  return String.format("%s%s", firstNumber, lastNumber);
                })
            .map(Integer::parseInt)
            .reduce(0, Integer::sum);

    Assertions.assertEquals(55834, partOneResult);

    final var partTwoResult =
        input.lines().stream()
            .map(line -> replaceWords(line))
            .map(line -> Splitter.fixedLength(1).trimResults().splitToList(line))
            .map(
                characters -> {
                  final var firstNumber = findNumber(characters);
                  final var lastNumber = findNumber(characters.reversed());

                  return String.format("%s%s", firstNumber, lastNumber);
                })
            .map(Integer::parseInt)
            .reduce(0, Integer::sum);

    Assertions.assertEquals(53221, partTwoResult);
  }

  private static int findNumber(final List<String> characters) {
    for (String character : characters) {
      try {
        return Integer.parseInt(character);
      } catch (final NumberFormatException ignored) {

      }
    }
    throw new RuntimeException("No number found");
  }

  private static String replaceWords(final String line) {
    var subbed = line;

    for (Map.Entry<String, String> entry : replacements.entrySet()) {
      subbed = subbed.replace(entry.getKey(), entry.getValue());
    }

    return subbed;
  }
}
