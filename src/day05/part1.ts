import { parseInput } from '../util';

export const ids = parseInput({
  split: {
    mapper: (seat) =>
      parseInt(seat.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2),
  },
});

export default Math.max(...ids);
