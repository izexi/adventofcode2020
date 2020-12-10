import { parseInput } from '../util';

const input = parseInput();
input.sort((prev, cur) => prev - cur).unshift(0);

const numOfPaths = input.reduce(
  (paths, n, i) => {
    for (let j = i - 3; j < i; j++) {
      if (n - input[j] <= 3) paths[i] += paths[j];
    }
    return paths;
  },
  input.map((_, i) => Number(i === 0))
);

export default numOfPaths.pop();
