function removeDuplicates(nums: number[]): number {
    // if the array is empty, return 0
    if(nums.length === 0) return 0;

    // pointer for where to place the next unique value
    let write = 1;

    // start reading from the second element;
    for (let read = 1; read < nums.length; read++){
        // if current number is different from the previous one
        if(nums[read] !== nums[read -1]){
            // place it at the write position
            nums[write] = nums[read];

            write++;
        }
    }

    // write is the count of unique elements;
    return write
};
