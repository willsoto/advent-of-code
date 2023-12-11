package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.Maps;
import com.willsoto.aoc.utils.Input;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.junit.jupiter.api.Assertions;

public class DayFour {
  private static final Pattern pattern =
      Pattern.compile(
          "(Card\\s+(?<cardNumber>\\d+)):\\s+(?<winningNumbers>.*)\\|(?<scratchedNumbers>.*)");

  public static void main(final String[] args) {
    final var input = new Input("day_four.txt");

    final var cards = input.lines().stream().map(Card::from).toList();

    final var partOne = cards.stream().map(Card::score).reduce(0, Integer::sum);
    Assertions.assertEquals(23441, partOne);

    final Map<Integer, Card> cardsByNumber =
        cards.stream().collect(Collectors.toMap(Card::cardNumber, Function.identity()));

    final Map<Card, Integer> cardCounts = Maps.newHashMap();
    countCardCopies(cards, cardsByNumber, cardCounts);

    final var partTwo = cardCounts.values().stream().reduce(0, Integer::sum);
    Assertions.assertEquals(5923918, partTwo);
  }

  private static void countCardCopies(
      final List<Card> cards,
      final Map<Integer, Card> cardsByNumber,
      final Map<Card, Integer> cardCounts) {
    for (var card : cards) {
      final var countMatched = card.matchedNumbers().size();

      cardCounts.compute(
          card,
          (key, value) -> {
            if (value != null) {
              return value + 1;
            }
            return 1;
          });

      if (countMatched == 0) {
        continue;
      }

      final var matches = new ArrayList<Card>();
      for (int i = card.cardNumber() + 1; i <= card.cardNumber() + countMatched; i++) {
        final var match = cardsByNumber.get(i);
        matches.add(match);
      }
      countCardCopies(matches, cardsByNumber, cardCounts);
    }
  }

  @Data
  @Builder
  @ToString(onlyExplicitlyIncluded = true)
  static final class Card {
    @ToString.Include private final int cardNumber;
    private final Set<Integer> winningNumbers;
    private final Set<Integer> scratchedNumbers;

    private static Set<Integer> parseNumbers(final String sequence) {
      return Splitter.on(" ").omitEmptyStrings().splitToList(sequence).stream()
          .map(Integer::parseInt)
          .collect(Collectors.toUnmodifiableSet());
    }

    public static Card from(final String line) {
      final var matcher = pattern.matcher(line);
      if (!matcher.find()) {
        throw new RuntimeException("No match for line");
      }

      final var winningNumbers = parseNumbers(matcher.group("winningNumbers"));
      final var scratchedNumbers = parseNumbers(matcher.group("scratchedNumbers"));

      return Card.builder()
          .cardNumber(Integer.parseInt(matcher.group("cardNumber")))
          .winningNumbers(winningNumbers)
          .scratchedNumbers(scratchedNumbers)
          .build();
    }

    public Set<Integer> matchedNumbers() {
      return this.scratchedNumbers().stream()
          .filter(n -> this.winningNumbers().contains(n))
          .collect(Collectors.toUnmodifiableSet());
    }

    public Integer score() {
      if (this.matchedNumbers().isEmpty()) {
        return 0;
      }
      var score = 0;
      for (var ignored : this.matchedNumbers()) {
        // First match is worth one point
        if (score == 0) {
          score = 1;
          continue;
        }

        // Each subsequent match is doubled
        score *= 2;
      }
      return score;
    }
  }
}
