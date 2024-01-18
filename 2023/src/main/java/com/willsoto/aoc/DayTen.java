package com.willsoto.aoc;

import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.willsoto.aoc.utils.Input;
import com.willsoto.aoc.utils.Point;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.Data;

public class DayTen {
  private static final String START = "S";
  private static final Set<String> NORTH = Sets.newHashSet(START, "|", "L", "J");
  private static final Set<String> EAST = Sets.newHashSet(START, "-", "L", "F");
  private static final Set<String> SOUTH = Sets.newHashSet(START, "|", "7", "F");
  private static final Set<String> WEST = Sets.newHashSet(START, "-", "J", "7");

  public static void main(final String[] args) {
    final var input = new Input("day_ten.txt");

    final var grid = generateGrid(input);

    System.out.printf("Part 1: %s", partOne(grid));
    System.out.printf("Part 2: %s", partTwo(grid));
  }

  private static Integer partOne(final Grid grid) {
    final var visited = getBoundaries(grid);

    return Math.floorDiv(visited.size() + 1, 2);
  }

  private static Integer partTwo(final Grid grid) {
    return 0;
  }

  private static Set<Point> getBoundaries(final Grid grid) {
    final var start = grid.getStart();
    final Set<Point> visited = Sets.newHashSet();
    final LinkedList<Point> pointsToVisit = Lists.newLinkedList(List.of(start));

    while (!pointsToVisit.isEmpty()) {
      final var point = pointsToVisit.pop();
      visited.add(point);

      grid.connectedPoints(point).stream()
          .filter(p -> !visited.contains(p))
          .forEach(pointsToVisit::add);
    }

    return visited;
  }

  private static Grid generateGrid(final Input input) {
    final Grid grid = new Grid();

    for (int x = 0; x < input.lines().size(); x++) {
      final var line = Splitter.fixedLength(1).trimResults().splitToList(input.lines().get(x));
      final var row = new ArrayList<>(line);
      grid.addRow(row);
    }

    return grid;
  }

  @Data
  static class Grid {
    private final List<List<String>> grid = new ArrayList<>();

    public void addRow(final List<String> row) {
      this.grid.add(row);
    }

    public String get(final Point point) {
      return this.grid.get(point.x()).get(point.y());
    }

    public String set(final Point point, final String value) {
      return this.grid.get(point.x()).set(point.y(), value);
    }

    public int height() {
      return this.grid.getFirst().size();
    }

    public int width() {
      return this.grid.size();
    }

    public List<Point> adjacent(final Point point) {
      final var x = point.x();
      final var y = point.y();
      final List<Point> adjacent = new ArrayList<>();

      if (x > 0) {
        adjacent.add(new Point(x - 1, y));
      }

      if (x < this.height() - 1) {
        adjacent.add(new Point(x + 1, y));
      }

      if (y > 0) {
        adjacent.add(new Point(x, y - 1));
      }

      if (y < this.width() - 1) {
        adjacent.add(new Point(x, y + 1));
      }

      return adjacent;
    }

    public boolean isConnected(final Point a, final Point b) {
      final var valueA = this.get(a);
      final var valueB = this.get(b);

      final var x1 = a.x();
      final var y1 = a.y();

      final var x2 = b.x();
      final var y2 = b.y();

      if (Objects.equals(x1, x2)) {
        if (y2 - y1 == 1 && EAST.contains(valueA) && WEST.contains(valueB)) {
          return true;
        }

        if (y1 - y2 == 1 && WEST.contains(valueA) && EAST.contains(valueB)) {
          return true;
        }
      }

      if (Objects.equals(y1, y2)) {
        if (x2 - x1 == 1 && SOUTH.contains(valueA) && NORTH.contains(valueB)) {
          return true;
        }

        return x1 - x2 == 1 && NORTH.contains(valueA) && SOUTH.contains(valueB);
      }

      return false;
    }

    public List<Point> connectedPoints(final Point point) {
      return this.adjacent(point).stream().filter(p -> this.isConnected(point, p)).toList();
    }

    public Point getStart() {
      for (int x = 0; x < this.grid.size(); x++) {
        final var row = this.grid.get(x);

        for (int y = 0; y < row.size(); y++) {
          final var point = new Point(x, y);

          if (this.get(point).equals(START)) {
            return point;
          }
        }
      }
      throw new RuntimeException("No start found");
    }
  }
}
