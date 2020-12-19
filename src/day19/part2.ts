import { parseInput } from '../util';

const input = parseInput({ split: { delimiter: '\n\n', mapper: false } });
const [rules, messages] = input;

const findMatches = (prevMatches = 0, length = 1): number => {
  const rulesMap = new Map(
    rules.split('\n').map((rule) => rule.split(': ')) as [string, string][]
  );

  const createPattern = (ruleNum: string): string => {
    const rule = rulesMap.get(ruleNum)!;
    const aOrB = rule.match(/"(a|b)"/)?.[1];

    if (aOrB) return aOrB;
    if (rule.startsWith('(')) return rule;

    const pattern = `(${rule
      .split(' | ')
      .map((subRule) => subRule.split(' ').map(createPattern).join(''))
      .join('|')})`;

    rulesMap.set(ruleNum, pattern);
    return pattern;
  };

  rulesMap.set('8', `(${createPattern('42')}+)`);
  rulesMap.set(
    '11',
    `(${Array.from(
      { length },
      (_, i) =>
        `(${createPattern('42')}{${i + 1}}${createPattern('31')}{${i + 1}})`
    ).join('|')})`
  );

  const matches = messages.match(new RegExp(`^${createPattern('0')}$`, 'gm'))!
    .length;
  return matches === prevMatches ? matches : findMatches(matches, ++length);
};

export default findMatches();
