/*
Easy
Link
Write a program to find the node at which the intersection of two singly linked lists begins.
no intersection, return null.
The linked lists must retain their original structure
no cycles
in O(n) time and O(1) memory.
*/

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let countA = getLinkLength(headA),
    countB = getLinkLength(headB);
  while (countA > countB) {
    headA = headA.next;
    countA--;
  }
  while (countB > countA) {
    headB = headB.next;
    countB--;
  }
  while(headA && headB) {
    if(headA === headB) return headA;
    headA = headA.next;
    headB = headB.next;
  }
  return null;
};

function getLinkLength(node) {
  let count = 0;
  while (node) {
    count++;
    node = node.next;
  }
  return count;
}

export default getIntersectionNode;
