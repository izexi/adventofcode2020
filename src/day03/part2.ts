import { numOfTrees } from './part1';

export default [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce((ans, [right, down]) => ans * numOfTrees(right, down), 1);
