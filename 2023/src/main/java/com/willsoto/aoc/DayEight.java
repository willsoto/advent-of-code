package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.Maps;
import com.willsoto.aoc.utils.Input;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.regex.Pattern;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.math3.util.ArithmeticUtils;
import org.junit.jupiter.api.Assertions;

public class DayEight {
  private static final List<String> directions =
      Splitter.fixedLength(1)
          .splitToList(
              "LRRLLRLRRRLRRRLRRLRRRLRRLRRRLRRLRRRLRLRRRLRRRLRRRLRLRRLRRRLRRRLRRLRRLRRLRLLLRRRLRRRLRLRLRRLLRRRLRRLRRRLRLRRLRRRLRRRLLRLRLLRRRLRRRLLRRRLRRRLRRRLRRLRRRLLLRRRLRLLLRLRLRLLRLRLLLRRLRRLLRRLRRRLRRLRRLRLRRLLRRLRLRRLLLRRRLLRRRLLRLRLLRRRLRLLRRLRLRRLRLRRRLLRRRLLRRLRLRRLRRLLRLRLRRRLRLRRRR");
  private static final Pattern nodePattern =
      Pattern.compile("(?<node>\\w+) = \\((?<left>\\w+), (?<right>\\w+)\\)");

  public static void main(final String[] args) {
    final var input = new Input("day_eight.txt");

    Assertions.assertEquals(14681, partOne(input));
    Assertions.assertEquals(14321394058031L, partTwo(input));
  }

  private static int partOne(final Input input) {
    final var nodes = buildNodes(input);

    int steps = 0;
    String currentNode = "AAA";
    final String endNode = "ZZZ";

    while (!currentNode.equals(endNode)) {
      for (var direction : directions) {
        final var nextNode = nodes.get(currentNode);
        currentNode = direction.equals("L") ? nextNode.getLeft() : nextNode.getRight();
        steps += 1;
        if (currentNode.equals(endNode)) {
          break;
        }
      }
    }
    return steps;
  }

  private static long partTwo(final Input input) {
    final var nodes = buildNodes(input);

    final String startSuffix = "A";
    final String endSuffix = "Z";
    final List<Integer> results = new ArrayList<>();

    for (var node : nodes.keySet()) {
      if (!node.endsWith(startSuffix)) {
        continue;
      }

      int steps = 0;
      while (!node.endsWith(endSuffix)) {
        final var direction = directions.get(steps % directions.size());
        final var currentNode = nodes.get(node);
        node = direction.equals("L") ? currentNode.getLeft() : currentNode.getRight();

        steps += 1;
      }
      results.add(steps);
    }
    long steps = results.getFirst();
    for (int i = 1; i < results.size(); i++) {
      steps = ArithmeticUtils.lcm(steps, (long) results.get(i));
    }

    return steps;
  }

  private static LinkedHashMap<String, Pair<String, String>> buildNodes(final Input input) {
    final LinkedHashMap<String, Pair<String, String>> nodes = Maps.newLinkedHashMap();

    input
        .lines()
        .forEach(
            line -> {
              final var matcher = nodePattern.matcher(line);

              while (matcher.find()) {
                final var node = matcher.group("node");
                final var left = matcher.group("left");
                final var right = matcher.group("right");

                nodes.put(node, ImmutablePair.of(left, right));
              }
            });

    return nodes;
  }
}
