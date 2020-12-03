import { parseInput } from '../util';

const input = parseInput({ split: { mapper: false } });

export const numOfTrees = (right: number, down: number) =>
  input.reduce(
    (trees, slope, pos) =>
      trees +
      Number(
        !(pos % down) && slope[((right * pos) / down) % slope.length] === '#'
      ),
    0
  );

export default numOfTrees(3, 1);
