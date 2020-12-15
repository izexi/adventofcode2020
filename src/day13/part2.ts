import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (line, i) => (i ? line.split(',').map(Number) : Number(line)),
  },
}) as [number, number[]];

const mod = (n: number, m: number) => ((n % m) + m) % m;

const [, ids] = input;
const buses = ids.filter(Boolean).map((id) => ({
  id: BigInt(id),
  offset: BigInt(mod(id - ids.indexOf(id), id)),
}));

const { offset } = buses.reduce(({ offset, id }, bus) => {
  while (offset % bus.id !== bus.offset) offset += id;
  return { offset, id: id * bus.id };
});

export default offset;
