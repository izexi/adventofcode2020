import { parseInput } from '../util';
import { decToBin, sumMemory } from './part1';

const input = parseInput({
  split: {
    delimiter: 'mask = ',
    mapper: (program: string) => {
      const [mask, ...lines] = program.split('\n').filter(Boolean);
      return lines.reduce((memory: Map<string, number>, line) => {
        const { address, value } = line.match(
          /mem\[(?<address>\d+)\] = (?<value>\d+)/
        )!.groups!;
        const binExp = mask.split('X').length - 1;

        for (let i = 0; i < 2 ** binExp; i++) {
          const floatingBit = [...i.toString(2).padStart(binExp, '0')];

          memory.set(
            [...decToBin(address)]
              .map((b, j) => {
                const currBit = mask[j];
                if (currBit === 'X') return floatingBit.shift()!;
                if (currBit === '1') return '1';
                return b;
              })
              .join(''),
            parseInt(
              [...decToBin(value)]
                .map((b, i) => (mask[i] === 'X' ? b : mask[i]))
                .join(''),
              2
            )
          );
        }

        return memory;
      }, new Map());
    },
  },
});

export default sumMemory(input);
