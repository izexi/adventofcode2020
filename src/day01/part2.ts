import { parseInput } from '../util';
import { multiplyEntries } from './part1';

const input = parseInput();

export default multiplyEntries(
  input.filter((f) => input.find((s) => input.find((t) => f + s + t === 2020)))
);

/*  A more efficient solution:

let solution;
const nums = new Set(input);

finding: for (const f of nums) {
  nums.delete(f);
  for (const s of nums) {
    const t = 2020 - f - s;
    if (nums.has(t)) {
      solution = f * s * t;
      break finding;
    }
  }
}

*/
