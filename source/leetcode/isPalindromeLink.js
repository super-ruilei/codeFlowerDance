/*
Easy
TODO: Space O(1) current O(n)
Given a singly linked list, determine if it is a palindrome.

Follow up:
Could you do it in O(n) time and O(1) space?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  let arr = [];
  while(head) {
    arr.push(head.val);
    head = head.next;
  }
  return arr.every((a,i) => a === arr[arr.length - i - 1]);
};

export default isPalindrome;
