const getRandomIndexes = (length: number, count: number): number[] => {
  const indexes = [];
  while (indexes.length < count) {
    const index = Math.floor(Math.random() * length);
    if (!indexes.includes(index)) indexes.push(index);
  }
  return indexes;
};

export const getRandom = <T>(array: T[], count: number): T[] => {
  const finalCount = Math.min(array.length, count);
  const randomIndexes = getRandomIndexes(array.length, finalCount);
  return randomIndexes.map((index) => array[index]);
};
