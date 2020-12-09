import { parseInput } from '../util';
import invalidNum from './part1';

const input = parseInput();
let encWeakness;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 2; j < input.length + 1; j++) {
    const contigiousArr = input.slice(i, j);

    if (contigiousArr.reduce((prev, cur) => prev + cur, 0) === invalidNum) {
      encWeakness = Math.min(...contigiousArr) + Math.max(...contigiousArr);
      break;
    }
  }
}

export default encWeakness;
