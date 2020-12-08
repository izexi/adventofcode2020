import { parseInput } from '../util';

export const instructions = parseInput({
  split: {
    mapper: (instruction) => {
      const [operation, argument] = instruction.split(' ');
      return { operation, argument: Number(argument) };
    },
  },
});

export const run = (part: number, _instructions = instructions) => {
  let acc = 0,
    i = 0;
  const visisted = new Set();

  while (true) {
    if (i === _instructions.length) return acc;
    if (visisted.has(i)) return part === 1 ? acc : void 0;

    const { operation, argument } = _instructions[i];

    visisted.add(i);
    if (operation === 'acc') {
      acc += argument;
      i++;
    } else {
      i += operation === 'jmp' ? argument : 1;
    }
  }
};

export default run(1);
