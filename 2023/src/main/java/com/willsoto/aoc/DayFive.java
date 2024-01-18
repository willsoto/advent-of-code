package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.willsoto.aoc.utils.Input;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;
import lombok.Builder;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;

public class DayFive {
  private static final Pattern seedsPattern = Pattern.compile("seeds: (?<seeds>.*)");

  public static void main(final String[] args) {
    final var input = new Input("day_five.txt");
    final var almanac = Almanac.from(input);

    System.out.printf("Part 1: %s", partOne(almanac));
    System.out.printf("Part 2: %s", partTwo(almanac));
  }

  private static Double partOne(final Almanac almanac) {
    double locationNumber = Double.POSITIVE_INFINITY;
    for (var seed : almanac.seeds()) {
      for (var map : almanac.maps()) {
        seed = seedToSubstrate(seed, map);
      }
      locationNumber = Math.min(locationNumber, seed);
    }
    return locationNumber;
  }

  private static Double partTwo(final Almanac almanac) {
    List<Pair<Double, Double>> seeds = new ArrayList<>(almanac.seedsAsRanges());

    for (var map : almanac.maps()) {
      var newSeeds = new ArrayList<Pair<Double, Double>>();

      while (!seeds.isEmpty()) {
        final var range = seeds.removeLast();
        final var start = range.getLeft();
        final var end = range.getRight();

        processSeedMap(start, end, seeds, newSeeds, map);
      }
      seeds = newSeeds;
    }

    return seeds.stream().min(Comparator.comparingDouble(Pair::getLeft)).stream()
        .findFirst()
        .map(Pair::getLeft)
        .orElseThrow();
  }

  private static void processSeedMap(
      final Double start,
      final Double end,
      final List<Pair<Double, Double>> seeds,
      final List<Pair<Double, Double>> newSeeds,
      final List<Triple<Double, Double, Double>> map) {
    boolean foundOverlap = false;

    for (var range : map) {
      final var destinationRangeStart = range.getLeft();
      final var sourceRangeStart = range.getMiddle();
      final var rangeLength = range.getRight();

      final var overlapStart = Math.max(start, sourceRangeStart);
      final var overlapEnd = Math.min(end, sourceRangeStart + rangeLength);

      if (overlapStart < overlapEnd) {
        foundOverlap = true;

        newSeeds.add(
            Pair.of(
                destinationRangeStart + (overlapStart - sourceRangeStart),
                destinationRangeStart + (overlapEnd - sourceRangeStart)));

        if (start < overlapStart) {
          seeds.add(Pair.of(start, overlapStart));
        }

        if (end > overlapEnd) {
          seeds.add(Pair.of(overlapEnd, end));
        }
        break;
      }
    }

    if (!foundOverlap) {
      newSeeds.add(Pair.of(start, end));
    }
  }

  private static Double seedToSubstrate(
      final Double seed, final List<Triple<Double, Double, Double>> maps) {
    Double stage = seed;
    for (var map : maps) {
      final var destinationRangeStart = map.getLeft();
      final var sourceRangeStart = map.getMiddle();
      final var rangeLength = map.getRight();

      if (stage >= sourceRangeStart && stage < sourceRangeStart + rangeLength) {
        stage = destinationRangeStart + (stage - sourceRangeStart);
        break;
      }
    }
    return stage;
  }

  /**
   * @param maps Structure: [[[destinationRangeStart, sourceRangeStart, rangeLength]]]
   */
  @Builder
  record Almanac(List<Double> seeds, List<List<Triple<Double, Double, Double>>> maps) {
    public static Almanac from(final Input input) {
      List<Double> seeds = new ArrayList<>();
      final List<List<Triple<Double, Double, Double>>> maps = new ArrayList<>();

      List<Triple<Double, Double, Double>> currentMap = null;
      for (var line : input.lines()) {
        if (line.trim().isBlank()) {
          continue;
        } else if (line.contains("map")) {
          currentMap = new ArrayList<>();
          maps.add(currentMap);
          continue;
        }

        if (line.startsWith("seeds:")) {
          final var matcher = seedsPattern.matcher(line);
          matcher.find();

          seeds =
              Splitter.on(" ").trimResults().splitToList(matcher.group("seeds")).stream()
                  .map(Double::parseDouble)
                  .toList();
          continue;
        }

        final var map =
            Splitter.on(" ").trimResults().splitToList(line).stream()
                .map(Double::parseDouble)
                .toList();
        if (map.size() != 3) {
          throw new RuntimeException(String.format("Got more entries than expected: %s", map));
        }
        currentMap.add(Triple.of(map.getFirst(), map.get(1), map.getLast()));
      }

      return Almanac.builder().seeds(seeds).maps(maps).build();
    }

    public List<Pair<Double, Double>> seedsAsRanges() {
      return Lists.partition(this.seeds, 2).stream()
          .map(
              seedRange ->
                  Pair.of(seedRange.getFirst(), seedRange.getFirst() + seedRange.getLast()))
          .toList();
    }
  }
}
