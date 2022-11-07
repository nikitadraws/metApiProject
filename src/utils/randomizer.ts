export const randomizer = (arr: number[], quantity: number): number[] => {
  const num = Math.floor(Math.random() * 2881);
  if (arr.every((el) => el !== num)) {
    arr.push(num);
  }
  return arr.length === 20 ? arr : randomizer(arr, quantity);
};
