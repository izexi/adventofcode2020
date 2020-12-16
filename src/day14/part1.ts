import { parseInput } from '../util';

export const decToBin = (n: string) => Number(n).toString(2).padStart(36, '0');
export const sumMemory = (memoryMap: Map<string, number>[]) =>
  Object.values(
    Object.fromEntries(memoryMap.flatMap((memory) => [...memory]))
  ).reduce((prev, cur) => prev + cur);

const input = parseInput({
  split: {
    delimiter: 'mask = ',
    mapper: (program: string) => {
      const [mask, ...lines] = program.split('\n').filter(Boolean);
      return lines.reduce((memory: Map<string, number>, line) => {
        const { address, value } = line.match(
          /mem\[(?<address>\d+)\] = (?<value>\d+)/
        )!.groups!;

        return memory.set(
          address,
          parseInt(
            [...decToBin(value)]
              .map((b, i) => (mask[i] === 'X' ? b : mask[i]))
              .join(''),
            2
          )
        );
      }, new Map());
    },
  },
});

export default sumMemory(input);
