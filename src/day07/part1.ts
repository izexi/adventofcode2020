import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (rule) =>
      rule.match(/(\d?[a-z ]*(?<!other)) bags?/g)!.map((bag) => {
        const { amount, colour } = bag.match(
          /(?<amount>\d+ )?(?<colour>[a-z ]+)bags?/
        )!.groups!;
        return {
          colour: colour.trim(),
          amount: Number(amount),
        };
      }),
  },
});

export const bagsMap = input.reduce(
  (map: Map<string, typeof input[0]>, [{ colour }, ...inner]) =>
    map.set(colour, inner),
  new Map()
);
const canContainSGold = (colour: string): boolean =>
  colour === 'shiny gold'
    ? true
    : bagsMap.get(colour)!.some(({ colour }) => canContainSGold(colour));

export default [...bagsMap.keys()].reduce(
  (total, colour) =>
    total + Number(colour !== 'shiny gold' && canContainSGold(colour)),
  0
);
