#include <vector>

class Solution {
public:
    std::vector<int> getConcatenation(std::vector<int>& nums) {
        std::vector<int> result;
        result.reserve(nums.size() * 2);

        for (int value : nums) {
            result.push_back(value);
        }

        for (int value : nums) {
            result.push_back(value);
        }

        return result;
    }
};
