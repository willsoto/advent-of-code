package com.willsoto.aoc.utils;

public record Point(Integer x, Integer y) {
  public Point adjustBy(final Point point) {
    return new Point(this.x + point.x(), this.y + point.y());
  }
}
