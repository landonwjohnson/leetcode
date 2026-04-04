/**
 * Finds the length of the longest "wiggle" subsequence.
 *
 * A wiggle subsequence is a sequence where the differences between
 * consecutive numbers strictly alternate between positive and negative.
 *
 * Example:
 * [1, 7, 4, 9, 2, 5]
 * → differences: +, -, +, -, +
 * → valid wiggle → length = 6
 *
 * -------------------------------------------------------------
 * 🧠 What this function is REALLY doing:
 *
 * Instead of trying all subsequences (which would be expensive),
 * we only track changes in direction (up vs down).
 *
 * We do NOT care about the exact sequence — only whether the
 * values are increasing or decreasing compared to the previous step.
 *
 * -------------------------------------------------------------
 * 🚀 Pattern this belongs to:
 *
 * - Greedy Algorithm
 * - State Tracking (minimal state: "up" and "down")
 *
 * At each step, we make the best local decision:
 * - If current number goes up → extend a "down" sequence
 * - If current number goes down → extend an "up" sequence
 *
 * -------------------------------------------------------------
 * 🎯 Real-world use cases:
 *
 * - Detecting trend changes (analytics, metrics dashboards)
 * - Stock price movement analysis (up/down fluctuations)
 * - Signal processing (oscillating data)
 * - Game development (tracking player movement direction changes)
 *
 * -------------------------------------------------------------
 * 💡 Interview insight:
 *
 * This problem tests whether you can:
 * - Recognize patterns instead of brute forcing
 * - Track minimal state instead of full sequences
 * - Apply greedy thinking efficiently
 *
 * -------------------------------------------------------------
 * ⏱ Complexity:
 * Time: O(n)
 * Space: O(1)
 */
function wiggleMaxLength(nums: number[]): number {
  // Edge case: if array has 0 or 1 element, it's already a wiggle
  if (nums.length < 2) return nums.length;

  // "up" tracks longest sequence ending with upward movement
  let up = 1;

  // "down" tracks longest sequence ending with downward movement
  let down = 1;

  for (let i = 1; i < nums.length; i++) {
    // If current number is greater → upward movement
    if (nums[i] > nums[i - 1]) {
      // Extend a previous downward sequence
      up = down + 1;
    }
    // If current number is smaller → downward movement
    else if (nums[i] < nums[i - 1]) {
      // Extend a previous upward sequence
      down = up + 1;
    }
    // If equal → ignore (no direction change)
  }

  // Return the longest valid wiggle sequence found
  return Math.max(up, down);
}
