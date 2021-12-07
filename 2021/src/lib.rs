mod day_1;
mod day_2;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn day_1() {
        day_1::run_part_1();
        day_1::run_part_2();
    }

    #[test]
    fn day_2() {
        day_2::run_part_1();
        day_2::run_part_2();
    }
}
