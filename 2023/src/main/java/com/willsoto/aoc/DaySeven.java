package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.ImmutableMap;
import com.willsoto.aoc.utils.Input;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;
import org.junit.jupiter.api.Assertions;

public class DaySeven {
  private static final Map<String, Integer> cardByStrengthPartOne =
      ImmutableMap.<String, Integer>builder()
          .put("A", 13)
          .put("K", 12)
          .put("Q", 11)
          .put("J", 10)
          .put("T", 9)
          .put("9", 8)
          .put("8", 7)
          .put("7", 6)
          .put("6", 5)
          .put("5", 4)
          .put("4", 3)
          .put("3", 2)
          .put("2", 1)
          .build();
  // J is now the weakest card
  private static final Map<String, Integer> cardByStrengthPartTwo =
      ImmutableMap.<String, Integer>builder()
          .put("A", 13)
          .put("K", 12)
          .put("Q", 11)
          .put("T", 10)
          .put("9", 9)
          .put("8", 8)
          .put("7", 7)
          .put("6", 6)
          .put("5", 5)
          .put("4", 4)
          .put("3", 3)
          .put("2", 2)
          .put("J", 1)
          .build();

  public static void main(final String[] args) {
    final var input = new Input("day_seven.txt");

    Assertions.assertEquals(251287184, partOne(input));
    Assertions.assertEquals(250757288, partTwo(input));
  }

  private static Integer partOne(final Input input) {
    final var handComparator = new HandComparator(cardByStrengthPartOne);
    final var rounds =
        input.lines().stream()
            .map(Round::from)
            .sorted(
                Comparator.comparing(Round::type)
                    .thenComparing(Round::hand, handComparator)
                    .reversed())
            .toList();

    return computeTotalScore(rounds);
  }

  private static Integer partTwo(final Input input) {
    final var handComparator = new HandComparator(cardByStrengthPartTwo);
    final var rounds =
        input.lines().stream()
            .map(Round::from)
            .sorted(
                Comparator.comparing(Round::bestPossibleType)
                    .thenComparing(Round::hand, handComparator)
                    .reversed())
            .toList();

    return computeTotalScore(rounds);
  }

  private static Integer computeTotalScore(final List<Round> rounds) {
    int total = 0;
    for (int rank = 0; rank < rounds.size(); rank++) {
      final var round = rounds.get(rank);
      final var score = (rank + 1) * round.bid();

      total += score;
    }
    return total;
  }

  @Getter
  @AllArgsConstructor
  enum Type {
    FIVE_OF_A_KIND(7),
    FOUR_OF_A_KIND(6),
    FULL_HOUSE(5),
    THREE_OF_A_KIND(4),
    TWO_PAIR(3),
    ONE_PAIR(2),
    HIGH_CARD(1);

    private final Integer rank;
  }

  private record HandComparator(Map<String, Integer> cardsByStrength)
      implements Comparator<List<String>> {
    @Override
    public int compare(final List<String> a, final List<String> b) {
      for (int i = 0; i < a.size(); i++) {
        final var suiteA = a.get(i);
        final var suiteB = b.get(i);

        if (Objects.equals(suiteA, suiteB)) {
          continue;
        }
        final var strengthA = this.cardsByStrength.get(suiteA);
        final var strengthB = this.cardsByStrength.get(suiteB);

        if (Objects.equals(strengthA, strengthB)) {
          continue;
        }
        return strengthA > strengthB ? -1 : 1;
      }
      return 0;
    }
  }

  @Data
  @ToString
  static class Round {
    private final List<String> hand;
    private final Integer bid;
    private final Type type;

    Round(final List<String> hand, final Integer bid) {
      this.hand = hand;
      this.bid = bid;
      this.type = this.getType();
    }

    public static Round from(final String line) {
      final var parts = Splitter.on(" ").trimResults().splitToList(line);
      final var hand = Splitter.fixedLength(1).trimResults().splitToList(parts.getFirst());
      final var bid = Integer.parseInt(parts.getLast());

      return new Round(hand, bid);
    }

    public Map<String, Long> cardCounts() {
      return this.hand().stream()
          .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    // Will convert J into a card that produces a better hand
    @ToString.Include
    public Type bestPossibleType() {
      final var numberOfJokers = Collections.frequency(this.hand, "J");

      // No jokers or already have the best possible hand.
      if (numberOfJokers == 0 || this.type.equals(Type.FIVE_OF_A_KIND)) {
        return this.type;
      }

      if (numberOfJokers == 1) {
        // Full house not possible with only one joker since you need a minimum of two of the same
        // suite.
        if (this.type.equals(Type.FOUR_OF_A_KIND)) {
          return Type.FIVE_OF_A_KIND;
        } else if (this.type.equals(Type.THREE_OF_A_KIND)) {
          return Type.FOUR_OF_A_KIND;
        } else if (this.type.equals(Type.TWO_PAIR)) {
          return Type.FULL_HOUSE;
        } else if (this.type.equals(Type.ONE_PAIR)) {
          return Type.THREE_OF_A_KIND;
        } else if (this.type.equals(Type.HIGH_CARD)) {
          return Type.ONE_PAIR;
        }
      } else if (numberOfJokers == 2) {
        // FOUR_OF_A_KIND not possible with two jokers
        if (this.type.equals(Type.FULL_HOUSE)) {
          return Type.FIVE_OF_A_KIND;
        } else if (this.type.equals(Type.THREE_OF_A_KIND)) {
          return Type.FULL_HOUSE;
        } else if (this.type.equals(Type.TWO_PAIR)) {
          // One of the pairs is a pair of jokers
          return Type.FOUR_OF_A_KIND;
        } else if (this.type.equals(Type.ONE_PAIR)) {
          return Type.THREE_OF_A_KIND;
        }
      } else if (numberOfJokers == 3) {
        if (this.type.equals(Type.FULL_HOUSE)) {
          return Type.FIVE_OF_A_KIND;
        } else if (this.type.equals(Type.THREE_OF_A_KIND)) {
          return Type.FOUR_OF_A_KIND;
        }
      } else if (numberOfJokers == 4) {
        return Type.FIVE_OF_A_KIND;
      }

      return this.type;
    }

    private Type getType() {
      final var size = this.cardCounts().size();

      if (size == 1) {
        return Type.FIVE_OF_A_KIND;
      } else if (size == 2) {
        return this.isFourOfAKind() ? Type.FOUR_OF_A_KIND : Type.FULL_HOUSE;
      } else if (size == 3) {
        return this.isThreeOfAKind() ? Type.THREE_OF_A_KIND : Type.TWO_PAIR;
      } else if (size == 4) {
        return Type.ONE_PAIR;
      }
      return Type.HIGH_CARD;
    }

    private boolean isFourOfAKind() {
      return this.cardCounts().values().stream().anyMatch(count -> count.equals(4L));
    }

    private boolean isThreeOfAKind() {
      return this.cardCounts().values().stream().anyMatch(count -> count.equals(3L));
    }
  }
}
