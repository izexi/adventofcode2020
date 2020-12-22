import { allergensMap } from './part1';

export default [...allergensMap.entries()]
  .sort()
  .map(([, ingredients]) => ingredients.values().next().value)
  .join(',');
