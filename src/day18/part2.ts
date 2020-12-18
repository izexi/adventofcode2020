import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (expression) =>
      eval(
        `((
          ${expression.replace(/[()+*]/g, (operator) => {
            if (operator === '(' || operator === ')') return operator.repeat(3);
            if (operator === '+') return ')+(';
            return '))*((';
          })}
        ))`
      ),
  },
});

export default input.reduce((prev, cur) => prev + cur, 0);
