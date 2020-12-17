import { parseInput } from '../util';

const input = parseInput({ split: { delimiter: '\n\n', mapper: false } });

const [ticketRules, , nearbyTickets] = input;
const ticketConstraints = ticketRules.split(' or ').flatMap((rule) =>
  rule.match(/\d+-\d+/g)!.map((constraints) => {
    const [min, max] = constraints.split('-').map(Number);
    return { min, max };
  })
);
const [, ...nearbyValues] = nearbyTickets.split('\n');

export default nearbyValues
  .flatMap((values) => values.split(',').map(Number))
  .reduce(
    (errorRate, value) =>
      errorRate +
      (ticketConstraints.every(({ min, max }) => value > max || value < min)
        ? value
        : 0),
    0
  );
