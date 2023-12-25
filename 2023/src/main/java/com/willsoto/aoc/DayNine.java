package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.willsoto.aoc.utils.Input;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import org.jooq.lambda.Seq;
import org.junit.jupiter.api.Assertions;

public class DayNine {
  public static void main(final String[] args) {
    final var input = new Input("day_nine.txt");
    final var histories = input.lines().stream().map(History::from).toList();

    while (!histories.stream().allMatch(History::isComplete)) {
      for (var history : histories) {
        history.descend();
      }
    }

    Assertions.assertEquals(1819125966, partOne(histories));
    Assertions.assertEquals(1140, partTwo(histories));
  }

  private static int partOne(final List<History> histories) {
    return histories.stream().map(History::nextValue).reduce(0, Integer::sum);
  }

  private static int partTwo(final List<History> histories) {
    return histories.stream().map(History::previousValue).reduce(0, Integer::sum);
  }

  @Builder
  record History(List<List<Integer>> tree) {
    public static History from(final String line) {
      final var values =
          Splitter.on(" ")
              .trimResults()
              .splitToStream(line)
              .map(Integer::parseInt)
              .collect(Collectors.toList());

      final ArrayList<List<Integer>> tree = new ArrayList<>();
      tree.add(values);

      return History.builder().tree(tree).build();
    }

    public void descend() {
      if (this.isComplete()) {
        return;
      }

      final var currentLine = this.tree.getLast();

      final var nextLine =
          Seq.ofType(currentLine.stream(), Integer.class).window(0, 1).stream()
              .filter(w -> w.window().count() == 2)
              .map(w -> w.window().toList())
              .map(pair -> pair.getLast() - pair.getFirst())
              .collect(Collectors.toList());
      this.tree.add(nextLine);
    }

    public boolean isComplete() {
      return this.tree.getLast().stream().allMatch(i -> i == 0);
    }

    public int nextValue() {
      return this.tree.stream().map(List::getLast).reduce(0, Integer::sum);
    }

    public int previousValue() {
      return this.tree.reversed().stream().map(List::getFirst).reduce(0, (acc, i) -> i - acc);
    }
  }
}
