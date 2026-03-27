import Foundation

func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var seen: [Int: Int] = [:]

    for (index, num) in nums.enumerated() {
        let needed = target - num
        if let otherIndex = seen[needed] {
            return [otherIndex, index]
        }
        seen[num] = index
    }

    return []
}
