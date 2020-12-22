import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (line) => {
      const [ingredients, allergens] = line
        .split(' (contains ')
        .map((food) => food.match(/([a-z]+)/g) as string[]);
      return { ingredients, allergens };
    },
  },
});

const commonIngredients = (
  ingredients: string[],
  otherIngredients?: string[],
  ...rest: string[][]
): string[] =>
  otherIngredients
    ? commonIngredients(
        ingredients.filter((ingredient) =>
          otherIngredients.includes(ingredient)
        ),
        ...rest
      )
    : ingredients;
const getAllergen = (allergens: Set<string>) => allergens.values().next().value;

const foundAllergens = new Set();
const allAllergens = [...new Set(input.flatMap(({ allergens }) => allergens))];
export const allergensMap = allAllergens.reduce(
  (map, allergen) =>
    map.set(
      allergen,
      new Set(
        commonIngredients(
          // @ts-ignore
          ...input
            .filter(({ allergens }) => allergens.includes(allergen))
            .map(({ ingredients }) => ingredients)
        )
      )
    ),
  new Map()
);
const hasAllergen = [...allergensMap.values()];

while (foundAllergens.size !== allAllergens.length) {
  const foundAllergenIndex = hasAllergen.findIndex(
    (allergens) =>
      allergens.size === 1 && !foundAllergens.has(getAllergen(allergens))
  );
  const foundAllergen = getAllergen(hasAllergen[foundAllergenIndex]);

  foundAllergens.add(foundAllergen);
  hasAllergen.forEach((allergens, i) => {
    if (foundAllergenIndex !== i) allergens.delete(foundAllergen);
  });
}

export default input
  .flatMap(({ ingredients }) => ingredients)
  .reduce(
    (appeared, ingredient) =>
      appeared + Number(!hasAllergen.map(getAllergen).includes(ingredient)),
    0
  );
