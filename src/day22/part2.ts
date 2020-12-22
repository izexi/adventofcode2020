import { parseInput } from '../util';
import { calcualteScore } from './part1';

const input = parseInput({
  split: {
    delimiter: '\n\n',
    mapper: (cards: string) => cards.match(/^(\d+)/gm)!.map(Number),
  },
}) as [number[], number[]];

const play = (p1: number[], p2: number[]) => {
  const playedCards = new Set();

  while (p1.length && p2.length) {
    const currentCards = `${p1.join(',')} ${p2.join(',')}`;
    if (+playedCards.has(currentCards) | +playedCards.add(currentCards))
      return 0;

    const topCards = [p1.shift()!, p2.shift()!];
    const [p1Top, p2Top] = topCards;
    const winner = Number(
      p1.length >= p1Top && p2.length >= p2Top
        ? play(p1.slice(0, p1Top), p2.slice(0, p2Top))
        : p1Top < p2Top
    );

    [p1, p2][winner].push(topCards[winner], topCards[winner ^ 1]);
  }

  return p1.length ? 0 : 1;
};

export default calcualteScore(input[play(...input)]);
