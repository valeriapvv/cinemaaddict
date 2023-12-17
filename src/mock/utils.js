const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const createUniqueIntegerGenerator = (min, max) => {
  const generatedIntegers = [];
  const maxLength = max - min + 1;

  return () => {
    if (generatedIntegers.length >= maxLength) {
      throw new Error(`No more unique integers from the range: [${min}, ${max}]`);
    }

    let integer;

    do {
      integer = getRandomInteger(min, max);
    } while (generatedIntegers.includes(integer));

    generatedIntegers.push(integer);

    return integer;
  };
};

export const createNextIntegerGenerator = (from = 1) => () => from++;
