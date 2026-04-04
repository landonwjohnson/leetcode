function isPalindrome(x: number): boolean {
    // convert number to string;
    const str = x.toString();

    // compare with reversed version
    return str === str.split('').reverse().join('');
};
