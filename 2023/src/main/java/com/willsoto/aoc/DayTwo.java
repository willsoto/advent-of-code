package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.willsoto.aoc.utils.Input;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.junit.jupiter.api.Assertions;

public class DayTwo {
  private static final Pattern lineMatcher =
      Pattern.compile("Game (?<number>\\d+): (?<results>.*)", Pattern.CASE_INSENSITIVE);
  private static final Pattern cubeMatcher =
      Pattern.compile("(?<number>\\d+) (?<color>.*)", Pattern.CASE_INSENSITIVE);

  public static void main(final String[] args) {
    final var input = new Input("day_two.txt");

    Assertions.assertEquals(2377, part1(input));
    Assertions.assertEquals(71220, part2(input));
  }

  private static ImmutablePair<Integer, String> parseCubeCount(final String txt) {
    final var matcher = cubeMatcher.matcher(txt);
    final var matches = matcher.find();
    assert matches;

    return ImmutablePair.of(Integer.parseInt(matcher.group("number")), matcher.group("color"));
  }

  private static Integer part1(final Input input) {
    return input.lines().stream()
        .map(
            line -> {
              final var matcher = lineMatcher.matcher(line);
              final var matches = matcher.find();
              assert matches;
              final var gameNumber = Integer.parseInt(matcher.group("number"));

              final var isValid =
                  Splitter.on(";").trimResults().splitToList(matcher.group("results")).stream()
                      .allMatch(
                          handful ->
                              Splitter.on(",").trimResults().splitToList(handful).stream()
                                  .allMatch(
                                      cube -> {
                                        final var countAndColor = parseCubeCount(cube);
                                        final var count = countAndColor.getLeft();
                                        final var color = countAndColor.getRight();
                                        return switch (color) {
                                          case "red" -> count <= 12;
                                          case "green" -> count <= 13;
                                          case "blue" -> count <= 14;
                                          default -> false;
                                        };
                                      }));

              return isValid ? gameNumber : 0;
            })
        .reduce(0, Integer::sum);
  }

  private static Integer part2(final Input input) {
    return input.lines().stream()
        .map(
            line -> {
              final AtomicInteger red = new AtomicInteger();
              final AtomicInteger green = new AtomicInteger();
              final AtomicInteger blue = new AtomicInteger();

              final var matcher = lineMatcher.matcher(line);
              final var matches = matcher.find();
              assert matches;

              final var handfuls =
                  Splitter.on(";").trimResults().splitToList(matcher.group("results"));

              handfuls.stream()
                  .flatMap(handful -> Splitter.on(",").trimResults().splitToList(handful).stream())
                  .map(DayTwo::parseCubeCount)
                  .forEach(
                      cube -> {
                        final var count = cube.getLeft();
                        final var color = cube.getRight();

                        switch (color) {
                          case "red" -> red.set(Math.max(red.get(), count));
                          case "green" -> green.set(Math.max(green.get(), count));
                          case "blue" -> blue.set(Math.max(blue.get(), count));
                        }
                      });

              return red.get() * green.get() * blue.get();
            })
        .reduce(0, Integer::sum);
  }
}
