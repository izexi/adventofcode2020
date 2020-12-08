import { instructions, run } from './part1';

let acc;

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];

  if (instruction.operation !== 'acc') {
    const maybeFixed = instructions.slice();
    maybeFixed[i] = { ...maybeFixed[i] };
    maybeFixed[i].operation = instruction.operation === 'jmp' ? 'nop' : 'jmp';

    if ((acc = run(2, maybeFixed))) break;
  }
}

export default acc;
