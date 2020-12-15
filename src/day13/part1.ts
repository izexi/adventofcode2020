import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (line, i) =>
      i ? line.split(',').map(Number).filter(Boolean) : Number(line),
  },
}) as [number, number[]];

const [earliest, ids] = input;
const maxId = Math.max(...ids);

const earliestBusTime = Array.from(
  { length: earliest + maxId + 1 },
  (_, i) => earliest + i
).find((time) => ids.some((id) => !(time % id)))!;

export default maxId * (earliestBusTime - 1013728);
