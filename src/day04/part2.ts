import { parseInput } from '../util';

const input = parseInput({ split: { mapper: false, delimiter: '\n\n' } });

export const fieldPatterns = {
  byr: /19[2-8]\d|199\d|200[0-2]/,
  iyr: /201\d|2020/,
  eyr: /202\d|2030/,
  hgt: /(1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in/,
  hcl: /#[a-f\d]{6}/,
  ecl: /(?:amb|blu|brn|gry|grn|hzl|oth)/,
  pid: /\d{9}/,
};
const fieldsRegex = Object.entries(fieldPatterns).map(
  ([field, constraints]) => `(?=.*\\b(${field}:${constraints.source})\\b)`
);

// /^(?=.*\b(byr:19[2-8]\d|199\d|200[0-2])\b)(?=.*\b(iyr:201\d|2020)\b)(?=.*\b(eyr:202\d|2030)\b)(?=.*\b(hgt:(1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)\b)(?=.*\b(hcl:#[a-f\d]{6})\b)(?=.*\b(ecl:(?:amb|blu|brn|gry|grn|hzl|oth))\b)(?=.*\b(pid:\d{9})\b).*$/s
const validPassportRegex = new RegExp(`^${fieldsRegex.join('')}.*$`, 's');

export default input.reduce(
  (valid, passport) => valid + Number(validPassportRegex.test(passport)),
  0
);
