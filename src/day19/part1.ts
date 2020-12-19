import { parseInput } from '../util';

const input = parseInput({ split: { delimiter: '\n\n', mapper: false } });

const [rules, messages] = input;
export const rulesMap = new Map(
  rules.split('\n').map((rule) => rule.split(': ')) as [string, string][]
);

const createPattern = (ruleNum: string): string => {
  const rule = rulesMap.get(ruleNum)!;
  return (
    rule.match(/"(a|b)"/)?.[1] ??
    `(${rule
      .split(' | ')
      .map((subRule) => subRule.split(' ').map(createPattern).join(''))
      .join('|')})`
  );
};

export default messages.match(new RegExp(`^${createPattern('0')}$`, 'gm'))!
  .length;
