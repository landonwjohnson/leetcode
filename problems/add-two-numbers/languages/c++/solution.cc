/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
 // dummy = a placeholder node so we don’t have to handle
        // "first node" as a special case
        ListNode* dummy = new ListNode(0);

        // current = pointer we use to build the new linked list
        ListNode* current = dummy;

        // carry = stores extra when sum is 10 or more
        // Example: 8 + 7 = 15 → store 5, carry 1
        int carry = 0;

        // Keep looping while:
        // - l1 still has nodes
        // - l2 still has nodes
        // - or we still have a carry
        while (l1 != nullptr || l2 != nullptr || carry != 0) {

            // start with carry from previous step

            int sum = carry;

            // if l1 exists, add its value
            if (l1 != nullptr) {
                sum += l1->val;

                l1 = l1->next;
            }

            // if l2 exists add it's value
            if(l2 != nullptr){
                sum += l2->val;
                l2 = l2->next;
            }

            // digit = what we store in this node (ones place)
            int digit = sum % 10;

            // carry = what we pass to the next interation
            int newCarry = sum / 10;

            // Create a new node with the digit
            current->next = new ListNode(digit);

            // move current forward
            current = current->next;

            // Update carry for next loop
            carry = newCarry;



        }
        //dummy was just a helper
            // return the real head of the result
            return dummy->next;
    }
};
