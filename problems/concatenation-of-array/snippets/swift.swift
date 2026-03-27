class Solution {
    func getConcatenation(_ nums: [Int]) -> [Int] {
        var result: [Int] = []
        result.reserveCapacity(nums.count * 2)

        for num in nums {
            result.append(num)
        }

        for num in nums {
            result.append(num)
        }

        return result
    }
}
