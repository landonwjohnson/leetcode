function lengthOfLongestSubstring(s: string): number {
    // Map to store the last index where each character was seen
    const lastSeen = new Map<string, number>()
    let input = s;

    // left pointer of our sliding window
    let left = 0;


    // track the best (longest) sub string so far
    let maxStart = 0;
    let maxLength = 0;

    // expand the window with the right pointer
    for (let right = 0; right < input.length; right++){
        const char = input[right]


        // if we have seen the character before and it's inside our current window
        if(lastSeen.has(char) && lastSeen.get(char)! >= left){
            // move the left pointer to one position after the previous occurrence
            left = lastSeen.get(char)! + 1;

            // this removes the duplicate from the window

        }


        // update the last seen index of the current character
        lastSeen.set(char, right);




        // calculate the current window length
        const currentLength = right - left + 1;


        // if this window is the longeest we have seen, update our result

        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxStart = left;
        }


    }



    // return the longest substring using the recorded start and length

    return maxLength
};
