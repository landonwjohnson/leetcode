export function getConcatenation(nums: number[]): number[] {
  const result: number[] = [];
  result.length = 0;

  for (const value of nums) {
    result.push(value);
  }

  for (const value of nums) {
    result.push(value);
  }

  return result;
}
