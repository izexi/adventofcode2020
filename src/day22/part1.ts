import { parseInput } from '../util';

const input = parseInput({
  split: {
    delimiter: '\n\n',
    mapper: (cards: string) => cards.match(/^(\d+)/gm)!.map(Number),
  },
});

export const calcualteScore = (cards: number[]) =>
  cards.reduce((score, card, i) => score + card * (cards.length - i), 0);

const play = ([[p1Top], [p2Top]] = input): number => {
  const winner = input[0].includes(Math.max(p1Top, p2Top)) ? 0 : 1;
  input[winner].push(input[winner].shift()!, input[winner ^ 1].shift()!);

  return input[winner ^ 1].length ? play() : calcualteScore(input[winner]);
};

export default play();
