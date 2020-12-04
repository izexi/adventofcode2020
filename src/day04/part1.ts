import { parseInput } from '../util';
import { fieldPatterns } from './part2';

const input = parseInput({ split: { mapper: false, delimiter: '\n\n' } });

export default input.reduce(
  (valid, passport) =>
    valid +
    Number(
      Object.keys(fieldPatterns).every((reqField) =>
        passport.includes(`${reqField}:`)
      )
    ),
  0
);
