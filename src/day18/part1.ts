import { parseInput } from '../util';

const lefToRightEval = (expression: string): number => {
  while (
    (expression = expression.replace(/\(([^()]*)\)/g, (_, expr) =>
      lefToRightEval(expr).toString()
    )).includes('(')
  );
  return expression
    .match(/[+*] \d+/g)!
    .reduce(
      (prev, cur) => eval(`${prev}${cur}`),
      Number(expression.split(' ')[0])
    );
};

const input = parseInput({ split: { mapper: lefToRightEval } });

export default input.reduce((prev, cur) => prev + cur, 0);
