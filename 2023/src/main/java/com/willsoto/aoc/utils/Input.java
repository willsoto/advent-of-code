package com.willsoto.aoc.utils;

import com.google.common.io.Resources;
import java.nio.charset.StandardCharsets;
import java.util.List;
import lombok.Data;
import lombok.SneakyThrows;

@Data
public class Input {
  private final String text;

  @SneakyThrows
  public Input(final String filename) {
    this.text = Resources.toString(Resources.getResource(filename), StandardCharsets.UTF_8);
  }

  public List<String> lines() {
    return this.text.lines().toList();
  }
}
