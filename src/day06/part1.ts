import { parseInput } from '../util';

const input = parseInput({ split: { mapper: false, delimiter: '\n\n' } });

export default input.reduce(
  (sum, group) => sum + new Set([...group.replace(/\n/g, '')]).size,
  0
);
