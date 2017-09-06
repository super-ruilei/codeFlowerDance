/*
Easy
Recursion
Given a binary search tree (BST),
find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia:

        _______6______
       /              \
    ___2__          ___8__
   /      \        /      \
   0      _4       7       9
         /  \
         3   5
For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6.
Another example is LCA of nodes 2 and 4 is 2
A node can be a descendant of itself according to the LCA definition.
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// Inorder Traverse
var lowestCommonAncestor2 = function (root, p, q) {
  if (root === null) return null;
  if (root.val >= p.val && root.val <= q.val) return root;
  if (root.val <= p.val && root.val >= q.val) return root;
  return lowestCommonAncestor(root.left, p, q) || lowestCommonAncestor(root.right, p, q);
};

// shrink the range
var lowestCommonAncestor = function (root, p, q) {
  if(root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
  if(root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
  return root;
};

export default lowestCommonAncestor;
