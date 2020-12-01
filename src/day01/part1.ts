import { parseInput } from '../util';

const input = parseInput();

export const multiplyEntries = (entries: number[]) =>
  entries.reduce((p, c) => p * c);

export default multiplyEntries(
  input.filter((f) => input.find((s) => f + s === 2020))
);

/*  A more efficient solution:

let solution;
const nums = new Set(input);

finding: for (const f of nums) {
  nums.delete(f);
  const s = 2020 - f;
  if (nums.has(s)) {
    solution = f * s;
    break finding;
  }
}

*/
