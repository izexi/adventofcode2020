import { parseInput } from '../util';

const input = parseInput({ split: { mapper: false } });

export const parseLine = (line: string) => {
  const { min, max, letter, password } = line.match(
    /(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)/
  )!.groups!;

  return {
    min: Number(min),
    max: Number(max),
    letter,
    password,
  };
};

export default input.reduce((valid, line) => {
  const { min, max, letter, password } = parseLine(line);
  const letterFreq = password.split(letter).length - 1;

  return valid + Number(letterFreq >= min && letterFreq <= max);
}, 0);
