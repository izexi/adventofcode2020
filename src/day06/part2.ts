import { parseInput } from '../util';

const input = parseInput({
  split: {
    delimiter: '\n\n',
    mapper: (group: string) =>
      group.split('\n').map((person) => new Set([...person])),
  },
});

export default input.reduce(
  (sum, group) =>
    sum +
    group.reduce(
      (allYes, person) => new Set([...allYes].filter(Set.prototype.has, person))
    ).size,
  0
);

/*  A more efficient solution:

const input = parseInput({ split: { mapper: false } });

const { answers, freq } = input.reduce(
  (obj, line, i) => {
    if (!line) {
      obj.freq += obj.answers.size;
    } else {
      obj.answers = new Set(
        input[i - 1]
          ? [...obj.answers].filter(Set.prototype.has, new Set(line))
          : line
      );
    }
    return obj;
  },
  { answers: new Set(input[0]), freq: 0 }
);

export default answers.size + freq;

*/
