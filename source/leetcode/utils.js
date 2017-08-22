function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// breadth-first traversal (allow null)
export function arrayToTree(arr) {
  return arr.map(a => a === null ? a : new TreeNode(a))
    .map((node, index, treeArray) => {
      let left = index * 2 + 1,
        right = index * 2 + 2;
      if (arr[left] !== undefined && node !== null) node.left = treeArray[left];
      if (arr[right] !== undefined && node !== null) node.right = treeArray[right];
      return node;
    })[0];
}

// breadth-first traversal (remove null)
export function treeToArray(rootNode) {
  if(!rootNode) return [];
  let res = [],
  queue = [rootNode];
  while(queue.length > 0) {
    let node = queue.shift()
    res.push(node);
    if(node.left !== null) queue.push(node.left);
    if(node.right !== null) queue.push(node.right);
  }
  return res.map(node => node.val);
}
