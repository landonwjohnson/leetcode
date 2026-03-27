export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let index = 0; index < nums.length; index += 1) {
    const current = nums[index];
    const needed = target - current;
    const otherIndex = seen.get(needed);
    if (typeof otherIndex === "number") {
      return [otherIndex, index];
    }
    seen.set(current, index);
  }

  return [];
}
