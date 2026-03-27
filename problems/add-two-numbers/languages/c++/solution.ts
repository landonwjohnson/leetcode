

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(l1: number[], l2: number[]): any{

    // carry = stores extra when sum is 10 or more
    // example: 8 + 7 = 15; store 5, carry 1;
    let carry = 0;

    // result = final the final array are building step by step
    const result: number[] = [];

    // i = pointer for l1;
    // j = pointer for l2;

    let i = 0;
    let j = 0;
    // keep looping while:
    // - we still have elements in l1
    // - or we have elements in l2
    // or carry left over
    while (i < l1.length || j < l2.length || carry !== 0 ) {
        // start with carry from the previous step
        let sum = carry;

        if(i < l1.length){
            sum += l1[i];
            i++;
        }

        if(j < l2.length){
            sum += l2[j];
            j++;
        }

        // digit = what we store in this node (ones place)
        const digit = sum % 10;
        result.push(digit);

        carry = Math.floor(sum/10);

        result.push(digit)

    }
};
