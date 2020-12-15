import { parseInput } from '../util';

export const input = parseInput({
  split: {
    mapper: ([direction, ...value]) => [direction, Number(value.join(''))],
  },
}) as [keyof typeof DIRECTIONS, number][];

export const DIRECTIONS = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
  R: [1],
  L: [-1],
};

const {
  position: [east, north],
} = input.reduce(
  ({ position: [_east, _north], angle }, [direction, value]) => {
    const [x, y] = Object.values(DIRECTIONS)[angle / 90];
    value *= DIRECTIONS[direction]?.find((d) => d) ?? 1;

    switch (direction) {
      case 'N':
      case 'S':
        _north += value;
        break;
      case 'E':
      case 'W':
        _east += value;
        break;
      case 'R':
      case 'L':
        angle = (angle + value + 360) % 360;
        break;
      default:
        _east += x * value;
        _north += y * value;
        break;
    }

    return { position: [_east, _north], angle };
  },
  { position: [0, 0], angle: 90 }
);

export default Math.abs(east) + Math.abs(north);
