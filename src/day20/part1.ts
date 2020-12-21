import { parseInput } from '../util';

const input = parseInput({
  split: {
    delimiter: '\n\n',
    mapper: (tile: string) => {
      const { id, image } = tile.match(
        /Tile (?<id>\d+):\n(?<image>[\s\S]*)/
      )!.groups!;
      return [Number(id), image.split('\n')];
    },
  },
});

const tilesMap = new Map(input as [number, string[]][]);
const edgeAndFlipped = (edge: string | string[]) => [
  Array.isArray(edge) ? edge.join('') : edge,
  [...edge].reverse().join(''),
];

const edgesAtId = [...tilesMap.entries()].reduce(
  (map: Map<number, string[]>, [id, tiles]) =>
    map.set(
      id,
      [
        edgeAndFlipped(tiles[0]),
        edgeAndFlipped(tiles.slice().pop()!),
        edgeAndFlipped(tiles.map(([left]) => left)),
        edgeAndFlipped(tiles.map((row) => row.slice(-1))),
      ].flat()
    ),
  new Map()
);

export default [...edgesAtId.entries()].reduce(
  (mulId, [id, edges], _, entries) => {
    return (mulId *=
      new Set(
        edges.flatMap((edge) =>
          entries.reduce(
            (ids: number[], [_id, _edges]) =>
              _edges.includes(edge) ? ids.concat(_id) : ids,
            []
          )
        )
      ).size === 3
        ? id
        : 1);
  },
  1
);
