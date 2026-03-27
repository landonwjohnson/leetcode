
// Project: Algorithms
// FilePath: problems/concatenation-of-array/languages/c++/solution.cc
// LastEdited: 2026-03-26T00:00:00Z
// Editor: Assistant

#include <vector>

// this takes data, and duplicates it back to back
// some examples of this being used in real use application is if you were to use this to loop a carousel or a list of items.
// and you wanted it to feel infinite and seamless.

class Solution {
public:
    std::vector<int> getConcatenation(std::vector<int>& nums) {

        // vector<int> = allows you to store integers.
        // it can also grow automatically as we add elements


        // nums = the input array (passed by reference, so we don't copy it
        // and means we are working with the original array, not a copy )

        // create a result array to store our answer
        std::vector<int> result;
        result.reserve(nums.size() * 2);

        // first pass:
        // loop through each number in nums
        for (int num : nums) {
            result.push_back(num);
        }

        // second pass:
        for (int num : nums) {
            result.push_back(num);
        }

        return result;

    }
};
