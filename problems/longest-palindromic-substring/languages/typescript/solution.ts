function longestPalindrome(s: string): string {
    if(s.length < 2){
        return s
    }

    let longest = "";

    function expand(left: number, right: number): string {
        // expand outward while both characters match
        while(left >= 0 && right < s.length && s[left] === s[right]){
            left--;
            right++;
        }

        // slice uses the corrected boundries after expanding too far
     return s.slice(left + 1, right)
    }

    for (let i = 0; i < s.length; i++){
        const odd = expand(i, i);

        const even = expand (i, i + 1);

        for (let i = 0; i < s.length; i++){
            if(odd.length > longest.length){
                longest = odd
            }

            if(even.length > longest.length){
                longest = even;
            }

        }
    }

    return longest;
};
