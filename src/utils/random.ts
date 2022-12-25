/* Возвращает случайную целую величину из положительного диапазона [min, max]. \
Если такого числа не существует (в т.ч. в силу некорректности переданных аргументов), \
функция возвращает 0. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

export const getRandomInteger = (min: number, max: number): number => {
  let result = 0;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
  }
  return result;
};

/* Возвращает случайную величину с плавающей точкой из положительного диапазона [min, max). \
Если такого числа не существует (в силу некорректности переданных аргументов), \
функция возвращает 0. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

export const getRandomFloat = (min: number, max: number): number => {
  let result = 0;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.random() * (max - min) + min;
  }
  return result;
};

/* Функция getRandomItem по умолчанию возвращает случайное значение из переданного ей массива iterable. */
export const getRandomItem = <T>(iterable: T[]): T => iterable[getRandomInteger(0, iterable.length - 1)];

/* Функция getRandomSample возвращает массив-выборку случайных элементов переданного массива iterable \
указанного размера. С помощью параметра quantity можно указать необходимый размер выборки. \
Если размер выборки \
больше длины передаваемого массива, то размер выборки уменьшается до его длины. */

export const getRandomSample = <T>(iterable: T[], sampleSize: number): T[] => {
  if (sampleSize > iterable.length) {
    sampleSize = iterable.length;
  }
  const remainingSelection = iterable.slice(), sample = [];
  let rndIndex = null;
  for (let i = 0; i <= sampleSize - 1; i++) {
    rndIndex = getRandomInteger(0, remainingSelection.length - 1);
    sample[i] = remainingSelection[rndIndex];
    remainingSelection.splice(rndIndex, 1);
  }
  return sample;
};
