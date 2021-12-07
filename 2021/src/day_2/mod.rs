use std::fs::File;
use std::io::{BufRead, BufReader};

fn read_input_file() -> BufReader<File> {
  return BufReader::new(
    File::open("./src/day_2/input.txt").expect("Something went wrong reading the file"),
  );
}

#[allow(dead_code)]
pub fn run_part_1() {
  let mut horizontal_position = 0;
  let mut depth = 0;

  let reader = read_input_file();

  for line in reader.lines() {
    let current = String::from(line.unwrap());
    let directions = current.split_once(" ").unwrap();
    let (direction, raw_distance) = directions;
    let distance: i32 = raw_distance.parse().unwrap();

    if direction == "forward" {
      horizontal_position = horizontal_position + distance;
    } else if direction == "down" {
      // In a sub so down increases the depth
      depth = depth + distance;
    } else if direction == "up" {
      depth = depth - distance;
    }
  }

  let total = horizontal_position * depth;

  assert_eq!(horizontal_position, 2073);
  assert_eq!(depth, 850);
  assert_eq!(total, 1762050);
}
