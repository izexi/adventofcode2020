import { parseInput } from '../util';

const input = parseInput({ split: { delimiter: '\n\n', mapper: false } });

const [ticketRules, myTicket, nearbyTickets] = input;
const ticketConstraints = ticketRules.split('\n').map((rule) => {
  const [name] = rule.split(':');
  const constraints = rule.match(/\d+-\d+/g)!.map((ranges) => {
    const [min, max] = ranges.split('-').map(Number);
    return { min, max };
  });
  return { name, constraints };
});
const [, myValues] = myTicket.split('\n');
const [, ...nearbyValues] = nearbyTickets.split('\n');
const validTickets = nearbyValues
  .map((ticket) => ticket.split(',').map(Number))
  .filter((ticket) =>
    ticket.every((value) =>
      ticketConstraints.some(({ constraints }) =>
        constraints.some(({ min, max }) => value <= max && value >= min)
      )
    )
  );
const fieldOrder = validTickets[0].map(
  (_, position) =>
    new Set(
      ticketConstraints
        .filter(({ constraints }) =>
          validTickets
            .map((values) => values[position])
            .every((ticket) =>
              constraints.some(({ min, max }) => ticket <= max && ticket >= min)
            )
        )
        .map(({ name }) => name)
    )
);
const foundFields = new Set();
const getField = (fields: typeof foundFields) => fields.values().next().value;

while (fieldOrder.some((fields) => fields.size > 1)) {
  const foundFieldIndex = fieldOrder.findIndex(
    (fields) => !foundFields.has(getField(fields)) && fields.size === 1
  )!;
  const foundField = getField(fieldOrder[foundFieldIndex]);

  foundFields.add(foundField);
  fieldOrder.forEach((fields, i) => {
    if (foundFieldIndex !== i) fields.delete(foundField);
  });
}

export default myValues
  .split(',')
  .reduce(
    (valMul, value, i) =>
      valMul *
      (getField(fieldOrder[i]).startsWith('departure') ? Number(value) : 1),
    1
  );
