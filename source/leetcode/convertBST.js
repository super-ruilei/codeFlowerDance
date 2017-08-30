/*
Easy
Recursion backtrack traverse
Given a Binary Search Tree (BST), convert it to a Greater Tree
Every key of the original BST is changed to
the original key plus sum of all keys greater than the original key in BST.

Example:

Input: The root of a Binary Search Tree like this:
              5
            /   \
           2     13

Output: The root of a Greater Tree like this:
             18
            /   \
          20     13
*/


/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  var sum = 0;
  traverse(root, 0);
  return root;

  function traverse(node) {
    if (node === null) return;
    traverse(node.right, sum);
    node.val += sum;
    sum = node.val;
    traverse(node.left);
  }
};

export default convertBST;
