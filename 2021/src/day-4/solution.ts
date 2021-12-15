import assert from "assert";
import _ from "lodash";
import { openInput } from "../utils.js";
import { BingoBoard } from "./models.js";

interface Winner {
  board: BingoBoard;
  winningNumber: number;
}

const NUMBERS_TO_DRAW = [
  46, 12, 57, 37, 14, 78, 31, 71, 87, 52, 64, 97, 10, 35, 54, 36, 27, 84, 80,
  94, 99, 22, 0, 11, 30, 44, 86, 59, 66, 7, 90, 21, 51, 53, 92, 8, 76, 41, 39,
  77, 42, 88, 29, 24, 60, 17, 68, 13, 79, 67, 50, 82, 25, 61, 20, 16, 6, 3, 81,
  19, 85, 9, 28, 56, 75, 96, 2, 26, 1, 62, 33, 63, 32, 73, 18, 48, 43, 65, 98,
  5, 91, 69, 47, 4, 38, 23, 49, 34, 55, 83, 93, 45, 72, 95, 40, 15, 58, 74, 70,
  89,
];

export function part1(): number {
  const boards = parseBingoBoards();
  const winner = findWinningBoardAndNumber(boards);
  assert(winner);

  const { board, winningNumber } = winner;

  const unmarkedTotal = _.sum(board.unmarkedNumbers);
  const result = winningNumber * unmarkedTotal;

  return result;
}

export function part2(): number {
  const boards = parseBingoBoards();
  const winner = findLastWinningBoardAndNumber(boards);
  assert(winner);

  const { board, winningNumber } = winner;

  const unmarkedTotal = _.sum(board.unmarkedNumbers);
  const result = winningNumber * unmarkedTotal;

  return result;
}

function parseBingoBoards(): BingoBoard[] {
  const input = openInput(import.meta.url);
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  return _(lines)
    .chunk(5)
    .map((board) =>
      board.map((line) => line.split(" ").filter((v) => v.trim() !== "")),
    )
    .map((board) => new BingoBoard(board))
    .value();
}

function findWinningBoardAndNumber(boards: BingoBoard[]): Winner | null {
  for (let index = 0; index < NUMBERS_TO_DRAW.length; index++) {
    const value = NUMBERS_TO_DRAW[index];

    boards.forEach((board) => board.playNumber(value));

    const winner = boards.find((board) => board.isWinner);

    if (winner) {
      return {
        board: winner,
        winningNumber: value,
      };
    }
  }

  return null;
}

function findLastWinningBoardAndNumber(boards: BingoBoard[]): Winner | null {
  for (let index = 0; index < NUMBERS_TO_DRAW.length; index++) {
    const value = NUMBERS_TO_DRAW[index];

    boards.forEach((board) => board.playNumber(value));

    const winner = boards
      .filter((board) => board !== undefined)
      .find((board) => {
        if (board.isWinner) {
          if (boards.length === 1) {
            return true;
          }
          boards.splice(boards.indexOf(board), 1);
        }
      });

    if (winner) {
      return {
        board: winner,
        winningNumber: value,
      };
    }
  }

  return null;
}
