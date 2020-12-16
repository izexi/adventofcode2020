import { parseInput } from '../util';

const input = parseInput({
  split: { delimiter: ',', mapper: (n: string, i: number) => [Number(n), i] },
}) as [number, number][];

export const numSpokenAt = (turn: number) => {
  let [lastSpoken] = input[input.length - 1];
  const spoken = new Map(input);

  for (let i = input.length; i < turn; i++) {
    const lastSpokenAt = spoken.get(lastSpoken);

    spoken.set(lastSpoken, i - 1);
    lastSpoken = lastSpokenAt === undefined ? 0 : i - 1 - lastSpokenAt;
  }

  return lastSpoken;
};

export default numSpokenAt(2020);
