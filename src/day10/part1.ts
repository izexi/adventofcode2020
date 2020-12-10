import { parseInput } from '../util';

const input = parseInput();

const [oneDiffs, , threeDiffs] = input
  .sort((prev, cur) => prev - cur)
  .reduce(
    (diffs, num, i) => {
      diffs[num - input[i - 1] - 1]++;
      return diffs;
    },
    [1, 0, 1]
  );

export default oneDiffs * threeDiffs;
