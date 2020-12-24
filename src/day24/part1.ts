import { parseInput } from '../util';

const input = parseInput({
  split: { mapper: (line) => line.match(/e|se|sw|w|nw|ne/g)! },
});

export const DIRECTIONS = {
  e: [1, 0],
  w: [-1, 0],
  ne: [0.5, -1],
  nw: [-0.5, -1],
  se: [0.5, 1],
  sw: [-0.5, 1],
};

export const blackTiles = input.reduce((blackTiles, tiles) => {
  const tile = tiles
    .reduce(
      ([x, y], direction) => {
        const [xInc, yInc] = DIRECTIONS[direction as keyof typeof DIRECTIONS];
        return [x + xInc, y + yInc];
      },
      [0, 0]
    )
    .toString();

  return blackTiles.delete(tile) ? blackTiles : blackTiles.add(tile);
}, new Set() as Set<string>);

export default blackTiles.size;
