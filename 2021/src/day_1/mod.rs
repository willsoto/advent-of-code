use std::fs::File;
use std::io::{BufRead, BufReader};

fn read_input_file() -> BufReader<File> {
  return BufReader::new(
    File::open("./src/day_1/input.txt").expect("Something went wrong reading the file"),
  );
}

#[allow(dead_code)]
pub fn run_part_1() {
  let reader = read_input_file();

  let mut previous: i32 = 0;
  let mut total_larger: i32 = 0;

  for line in reader.lines() {
    let current: i32 = line.unwrap().parse().unwrap();

    if previous == 0 {
      previous = current;
      continue;
    }

    if current > previous {
      total_larger = total_larger + 1;
    }

    previous = current;
  }

  assert_eq!(total_larger, 1228);
}

#[allow(dead_code)]
pub fn run_part_2() {
  let reader = read_input_file();
  let window_size = 3;

  let mut previous: i32 = 0;
  let mut total_larger: i32 = 0;
  let mut processed_lines: Vec<i32> = vec![];

  for line in reader.lines() {
    let value: i32 = line.unwrap().parse().unwrap();
    processed_lines.push(value);
  }

  for window in processed_lines.windows(window_size) {
    let current: i32 = window.iter().sum();

    if previous == 0 {
      previous = current;
      continue;
    }

    if current > previous {
      total_larger = total_larger + 1;
    }

    previous = current;
  }

  assert_eq!(total_larger, 1257);
}
