/*
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
  let countA = 0,
    countB = 0,
    nodeA = headA,
    nodeB = headB;
  while (nodeA) {
    countA++;
    nodeA = nodeA.next;
  }
  while (nodeB) {
    countB++;
    nodeB = nodeB.next;
  }
};

export default getIntersectionNode;
