import { parseInput } from '../util';

const input = parseInput();

export default input
  .slice(25)
  .find(
    (num, i) =>
      !input
        .slice(i, i + 25)
        .some((otherNum, _, arr) => arr.includes(num - otherNum))
  );
