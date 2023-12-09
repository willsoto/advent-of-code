package com.willsoto.aoc.utils;

import javax.annotation.Nullable;

public class Characters {
  public static boolean isInteger(final String txt) {
    return safeParseInt(txt) != null;
  }

  @Nullable
  public static Integer safeParseInt(final String txt) {
    try {
      return Integer.parseInt(txt);
    } catch (final NumberFormatException ignored) {
      return null;
    }
  }
}
