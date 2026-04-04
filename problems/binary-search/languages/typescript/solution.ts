
// Binary search is an algorithm that repeatedly divides a sorted or monotonic search space in half by comparing a midpoint to a target or condition, reducing the problem size logarithmically.


function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right){
        const mid = Math.floor((left + right) / 2);

        if(nums[mid] === target){
            return mid;
        }

        if (nums[mid] < target){
            left = mid + 1 // go right
        } else {
            right = mid - 1 // go left
        }
    }

    return -1
};
