use std::fs::File;
use std::io::{BufRead, BufReader};

fn read_input_file() -> BufReader<File> {
  return BufReader::new(
    File::open("./src/day_2/input.txt").expect("Something went wrong reading the file"),
  );
}

fn parse_direction_and_distance(row: String) -> (String, i32) {
  let directions = row.split_once(" ").unwrap();
  let (direction, raw_distance) = directions;
  let distance: i32 = raw_distance.parse().unwrap();

  return (String::from(direction), distance);
}

#[allow(dead_code)]
pub fn run_part_1() {
  let reader = read_input_file();

  let mut horizontal_position = 0;
  let mut depth = 0;

  for line in reader.lines() {
    let row = String::from(line.unwrap());
    let (direction, distance) = parse_direction_and_distance(row);

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

#[allow(dead_code)]
pub fn run_part_2() {
  let reader = read_input_file();

  let mut horizontal_position = 0;
  let mut depth = 0;
  let mut aim = 0;

  for line in reader.lines() {
    let row = String::from(line.unwrap());
    let (direction, distance) = parse_direction_and_distance(row);

    if direction == "forward" {
      horizontal_position = horizontal_position + distance;
      depth = depth + aim * distance;
    } else if direction == "down" {
      // In a sub so down increases the depth
      aim = aim + distance;
    } else if direction == "up" {
      aim = aim - distance;
    }
  }

  let total = horizontal_position * depth;

  assert_eq!(horizontal_position, 2073);
  assert_eq!(depth, 895269);
  assert_eq!(total, 1855892637);
}
