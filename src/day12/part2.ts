import { DIRECTIONS, input } from './part1';

const ROTATIONS: {
  [key: number]: (east: number, north: number) => [number, number];
} = {
  0: (east, north) => [east, north],
  90: (east, north) => [north, -east],
  180: (east, north) => [-east, -north],
  270: (east, north) => [-north, east],
  360: (east, north) => [east, north],
};

const {
  position: [east, north],
} = input.reduce(
  (
    { position: [pEast, pNorth], waypoint: [wEast, wNorth], angle },
    [direction, value]
  ) => {
    value *= DIRECTIONS[direction]?.find((d) => d) ?? 1;

    switch (direction) {
      case 'N':
      case 'S':
        wNorth += value;
        break;
      case 'E':
      case 'W':
        wEast += value;
        break;
      case 'R':
      case 'L':
        angle = (value + 360) % 360;
        [wEast, wNorth] = ROTATIONS[angle](wEast, wNorth);
        break;
      default:
        pEast += value * wEast;
        pNorth += value * wNorth;
        break;
    }

    return { position: [pEast, pNorth], waypoint: [wEast, wNorth], angle };
  },
  { position: [0, 0], waypoint: [10, 1], angle: 0 }
);

export default Math.abs(east) + Math.abs(north);
