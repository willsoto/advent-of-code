import _ from "lodash";

type Board = string[][];

export class BingoBoard {
  #rows: BoardMember[] = [];

  #columns: BoardMember[] = [];

  constructor(private board: Board) {}

  private get rows(): BoardMember[] {
    if (this.#rows.length > 0) {
      return this.#rows;
    }

    this.#rows = this.board.map((row) => new BoardMember(row));

    return this.#rows;
  }

  private get columns(): BoardMember[] {
    if (this.#columns.length > 0) {
      return this.#columns;
    }

    this.#columns = _.zip(...this.board).map((column) => new BoardMember(column as unknown as string[]));

    return this.#columns;
  }

  private get boardMembers() {
    return [...this.rows, ...this.columns];
  }

  private get winningMember(): BoardMember | null {
    if (this.rowWinner !== null) {
      return this.rowWinner;
    } else if (this.columnWinner !== null) {
      return this.columnWinner;
    }

    return null;
  }

  private get rowWinner(): BoardMember | null {
    return this.rows.find((row) => row.isWinner) ?? null;
  }

  private get columnWinner(): BoardMember | null {
    return this.columns.find((column) => column.isWinner) ?? null;
  }

  playNumber(value: number): void {
    if (this.isWinner) {
      return;
    }

    this.boardMembers.forEach((member) => {
      member.playNumber(value);
    });
  }

  get markedNumbers(): number[] {
    return this.rows.flatMap((row) => row.markedNumbers);
  }

  get unmarkedNumbers(): number[] {
    return this.rows.flatMap((row) => row.unmarkedNumbers);
  }

  get isWinner(): boolean {
    return this.winningMember !== null;
  }
}

class BoardMember {
  #state = new Map<number, boolean>();

  public members: number[];

  constructor(members: string[]) {
    this.members = members.map((member) => parseInt(member));

    this.members.forEach((member) => {
      this.#state.set(member, false);
    });
  }

  playNumber(value: number): void {
    this.members.forEach((member) => {
      if (member === value) {
        this.#state.set(member, true);
      }
    });
  }

  get markedNumbers(): number[] {
    const keys = Array.from(this.#state.keys());

    return keys.filter((value) => {
      const active = this.#state.get(value);

      return active;
    });
  }

  get unmarkedNumbers(): number[] {
    const keys = Array.from(this.#state.keys());

    return keys.filter((value) => {
      const active = this.#state.get(value);

      return !active;
    });
  }

  get isWinner(): boolean {
    return Array.from(this.#state.values()).every((active) => active);
  }
}
