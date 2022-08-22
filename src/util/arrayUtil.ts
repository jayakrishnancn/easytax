export const sum = (arr: any[]): number =>
  arr.reduce((acc, n) => acc + (Number(n) || 0), 0);
