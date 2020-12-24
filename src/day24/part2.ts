import { blackTiles, DIRECTIONS } from './part1';

let newBlackTiles = blackTiles;

for (let day = 1; day <= 100; day++) {
  const tileFreqs = [...newBlackTiles.values()].reduce(
    (tileFreqs, blackTile) => {
      const [x, y] = blackTile.split(',').map(Number);
      Object.values(DIRECTIONS).forEach(([xInc, yInc]) => {
        const tilePos = [x + xInc, y + yInc].toString();
        tileFreqs.set(tilePos, (tileFreqs.get(tilePos) ?? 0) + 1);
      });
      return tileFreqs;
    },
    new Map()
  );

  newBlackTiles = [...tileFreqs.entries()].reduce(
    (newBlacks, [tile, freq]) =>
      freq === 2 || (newBlackTiles.has(tile) && freq === 1)
        ? newBlacks.add(tile)
        : newBlacks,
    new Set() as Set<string>
  );
}

export default newBlackTiles.size;
