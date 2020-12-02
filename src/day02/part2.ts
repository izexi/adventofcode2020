import { parseInput } from '../util';
import { parseLine } from './part1';

const input = parseInput({ split: { mapper: false } });

export default input.reduce((valid, line) => {
  const { min, max, letter, password } = parseLine(line);
  const isValid = (pos: number) => Number(password[pos - 1] === letter);

  return valid + (isValid(min) ^ isValid(max));
}, 0);
