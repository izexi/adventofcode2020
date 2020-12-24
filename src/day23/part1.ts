import { parseInput } from '../util';

const input = parseInput({ split: { delimiter: '' } });
const totalCups = input.length;
let lastPicked = input[input.length - 1];

for (let move = 1; move <= 100; move++) {
  const currI = (input.indexOf(lastPicked) + 1) % input.length;
  lastPicked = input[currI];

  const nextThree = Array.from({ length: 3 }, () => {
    const index = (currI + 1) % totalCups;
    return input.splice(index >= input.length ? 0 : index, 1);
  }).flat();

  const getDest = (destination = lastPicked - 1): number => {
    if (destination < Math.min(...input)) return Math.max(...input);
    if (nextThree.includes(destination)) return getDest(--destination);
    return destination;
  };

  input.splice(input.indexOf(getDest()) + 1, 0, ...nextThree);
}

const [before1, after1] = input.join('').split('1');
export default after1 + before1;
