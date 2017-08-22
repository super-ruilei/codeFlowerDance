/*
Easy
Recursion
The merge rule is:
If two nodes overlap, then sum node values up as the new value of the merged node.
Else, the NOT null node will be used as the node of new tree.
*/

/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
/*
simplier:
  let node = new TreeNode(t1.val + t2.val);
  node.left = mergeTrees(t1.left, t2.left);
  node.right = mergeTrees(t1.right, t2.right);
  return node;
*/
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var mergeTrees = function (t1, t2) {
  if (t1 === null && t2 === null) return null;
  if (t1 === null) return t2;
  if (t2 === null) return t1;

  let node = new TreeNode(t1.val + t2.val);
  node.left = mergeTrees(t1.left, t2.left);
  node.right = mergeTrees(t1.right, t2.right);
  return node;
};

export default mergeTrees;
