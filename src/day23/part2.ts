import { parseInput } from '../util';

interface Cup {
  label: number;
  next: null | Cup;
}

const input = parseInput({ split: { delimiter: '' } });

const cups: Cup[] = Array.from(
  { length: 1000000 },
  (_, i) => input[i] || 9 + (i - 8)
)
  .map((label) => ({ label, next: null }))
  .map((cup, i, cups) =>
    Object.assign(cup, { next: cups[(cups.length + i + 1) % cups.length] })
  );
const cupsMap = new Map(cups.map((cup) => [cup.label, cup]));
let [lastPicked] = cups;

for (let move = 1; move <= 10000000; move++) {
  const nextCup = lastPicked.next!;
  const nextThree = [
    nextCup.label,
    nextCup.next!.label,
    nextCup.next!.next!.label,
  ];
  lastPicked.next = nextCup.next!.next!.next;

  const getDest = (destination = lastPicked.label): number => {
    if (destination === 1) return cupsMap.size;
    return nextThree.includes(--destination)
      ? getDest(destination)
      : destination;
  };
  const destination = cupsMap.get(getDest())!;
  const temp = destination.next;

  destination.next = nextCup;
  destination.next!.next!.next!.next = temp;
  lastPicked = lastPicked.next!;
}

const cupAfter1 = cupsMap.get(1)!.next!;
export default cupAfter1.label * cupAfter1.next!.label;
