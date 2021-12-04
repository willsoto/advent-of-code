use std::fs::File;
use std::io::{BufRead, BufReader};

#[allow(dead_code)]
pub fn run() {
  let reader = BufReader::new(
    File::open("./src/day_1/input.txt").expect("Something went wrong reading the file"),
  );

  let mut previous: i32 = 0;
  let mut total_larger: i32 = 0;

  for line in reader.lines() {
    for value in line.unwrap().split_whitespace() {
      let current: i32 = value.parse().unwrap();

      if previous == 0 {
        previous = current;
        continue;
      }

      if current > previous {
        total_larger = total_larger + 1;
      }

      previous = current;
    }
  }

  assert_eq!(total_larger, 1228);
}
