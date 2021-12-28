import _ from "lodash";

type Start = [x1: number, y1: number];
type End = [x2: number, y2: number];
export type Coordinates = [Start, End];

export class VentLine {
  #start: Start;

  #end: End;

  constructor(public coordinates: string[][]) {
    const [start, end] = coordinates;

    this.#start = start.map((value) => parseInt(value)) as Start;
    this.#end = end.map((value) => parseInt(value)) as End;
  }

  get xDistance(): number {
    return Math.abs(this.x1 - this.x2);
  }

  get yDistance(): number {
    return Math.abs(this.y1 - this.y2);
  }

  get isDiagonal(): boolean {
    return this.xDistance !== 0 && this.yDistance !== 0;
  }

  getXRange(): number[] {
    return this.getValuesBetween(this.x1, this.x2);
  }

  getYRange(): number[] {
    return this.getValuesBetween(this.y1, this.y2);
  }

  topology(): number[][] {
    const xRange = this.getXRange();
    const yRange = this.getYRange();

    return xRange.map((value, index) => [value, yRange[index]]);
  }

  private get distance(): number {
    return Math.max(this.xDistance, this.yDistance) + 1;
  }

  private getValuesBetween(v1: number, v2: number): number[] {
    if (v1 > v2) {
      return _.range(v1, v2 - 1, -1);
    } else if (v1 < v2) {
      return _.range(v1, v2 + 1);
    }
    return _.range(0, this.distance).fill(v1);
  }

  private get x1(): number {
    return this.#start[0];
  }

  private get y1(): number {
    return this.#start[1];
  }

  private get x2(): number {
    return this.#end[0];
  }

  private get y2(): number {
    return this.#end[1];
  }

  debug() {
    console.log(this.#start, this.#end);
  }
}
