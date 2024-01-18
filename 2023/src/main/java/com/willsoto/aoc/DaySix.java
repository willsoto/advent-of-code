package com.willsoto.aoc;

import com.google.common.collect.ImmutableSet;
import java.util.Set;
import lombok.Builder;

public class DaySix {
  // Input
  // Time:        59     79     65     75
  // Distance:   597   1234   1032   1328
  private static final Set<Race> partOneRaces =
      ImmutableSet.<Race>builder()
          .add(Race.builder().time(59).maxDistance(597L).build())
          .add(Race.builder().time(79).maxDistance(1234L).build())
          .add(Race.builder().time(65).maxDistance(1032L).build())
          .add(Race.builder().time(75).maxDistance(1328L).build())
          .build();
  private static final Race partTwoRace =
      Race.builder().time(59796575).maxDistance(597123410321328L).build();

  public static void main(final String[] args) {
    System.out.printf("Part 1: %s", partOne());
    System.out.printf("Part 2: %s", partTwoRace.differentWaysToWin());
  }

  private static Long partOne() {
    return partOneRaces.stream().map(Race::differentWaysToWin).reduce(1L, (a, b) -> a * b);
  }

  @Builder
  record Race(Integer time, Long maxDistance) {
    public Long differentWaysToWin() {
      long countWinningHoldTimes = 0L;

      for (long holdTime = 0L; holdTime < this.time(); holdTime++) {
        final var timeRemaining = this.time() - holdTime;
        final var distance = holdTime * timeRemaining;

        if (distance > this.maxDistance()) {
          countWinningHoldTimes += 1L;
        }
      }
      return countWinningHoldTimes;
    }
  }
}
