import { bagsMap } from './part1';

const individualBags = (colour: string, map = bagsMap): number =>
  map
    .get(colour)!
    .reduce(
      (total, { amount, colour }) =>
        total + amount * individualBags(colour, map),
      1
    );

export default individualBags('shiny gold') - 1;
