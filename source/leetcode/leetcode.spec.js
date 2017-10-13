import {
  arrayToTree,
  treeToArray,
  arrayToLink,
  linkToArray
} from './utils';
import longestCommonPrefix from './longestCommonPrefix';
import numberComplement from './numberComplement';
import findRelativeRanks from './relativeRank';
import firstUniqChar from './firstUniqueCharacter';
import sumNestedArray from './sumNestedArray';
import possibleBinary from './possibleBinary';
import mergeTrees from './mergeTrees';
import islandPerimeter from './islandPerimeter';
import MyQueue from './stackToQueue';
import MyStack from './queueToStack';
import numberDisappeared from './numberDisappeared';
import permutation from './permutation';
import diameterOfBinaryTree from './diameterTree';
import generateParenthesis from './parenthesis';
import reverseWords from './reverseWords';
import convertBST from './convertBST';
import isSubtree from './isSubtree';
import isPalindrome from './isPalindromeLink';
import getIntersectionNode from './linkIntersection';
import twoSum from './sumSortedArray';
import mergeTwoLists from './mergeSortedList';
import lowestCommonAncestor from './commonAncestorNode';
import isValidParentheses from './validParentheses';
import countPrimes from './countPrimes';
import MinStack from './minStack';
import handleInput from './handleInput';
import gaussian from './gaussian';

describe("leetcode", function () {
  it("longest common prefix", function () {
    expect(longestCommonPrefix(["whose", "what", "wh"])).toEqual('wh');
    expect(longestCommonPrefix(["loo", "loa", "lob"])).toEqual('lo');
    expect(longestCommonPrefix(["a", "", "b"])).toEqual('');
  });

  it("number complement", function () {
    expect(numberComplement(5)).toBe(2);
    expect(numberComplement(1)).toBe(0);
    expect(numberComplement(16)).toBe(15);
  });

  it("relative rank", function () {
    const arr = [10, 3, 8, 9, 4];
    const exp = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"];
    expect(findRelativeRanks(arr)).toEqual(exp);
  });

  it("first unique character", function () {
    expect(firstUniqChar('loveleetcode')).toBe(2);
    expect(firstUniqChar('lool')).toBe(-1);
  });

  it("sum nested array", function () {
    const nestedArr = [1, [2, 3],
      [4, [5, [6],
        [7]
      ]]
    ];
    expect(sumNestedArray([])).toBe(0);
    expect(sumNestedArray(nestedArr)).toBe(28);
  });

  it("possible binary combination", function () {
    const exp3 = ["110", "010", "100", "000", "111", "011", "101", "001"];
    const exp2 = ["10", "00", "11", "01"];
    expect(possibleBinary(3).length).toBe(exp3.length);
    expect(possibleBinary(3)).toEqual(jasmine.arrayContaining(exp3));
    expect(possibleBinary(2).length).toBe(exp2.length);
    expect(possibleBinary(2)).toEqual(jasmine.arrayContaining(exp2));
  });

  it("merge trees", function () {
    const t1 = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
    const t2 = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
    const t3 = arrayToTree([2, 4, 6, 8, 10, 12, 14]);
    const res = treeToArray(mergeTrees(t1, t2));
    const exp = treeToArray(t3);
    expect(res.length).toEqual(exp.length);
    expect(res).toEqual(jasmine.arrayContaining(exp));
  });

  it("island perimeter", function () {
    const island = [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0]
    ]
    expect(islandPerimeter(island)).toEqual(16);
  });

  it("stack to queue", function () {
    let queue = new MyQueue();
    expect(queue.empty()).toEqual(true);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    expect(queue.empty()).toEqual(false);
    expect(queue.pop()).toEqual(1);
    expect(queue.peek()).toEqual(2);
    expect(queue.pop()).toEqual(2);
    expect(queue.pop()).toEqual(3);
  });

  it("queue to stack", function () {
    let stack = new MyStack();
    expect(stack.empty()).toEqual(true);
    stack.push(3);
    stack.push(2);
    expect(stack.empty()).toEqual(false);
    expect(stack.pop()).toEqual(2);
    expect(stack.top()).toEqual(3);
    stack.push(1);
    expect(stack.top()).toEqual(1);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(3);
  });

  it("number disappeared", function () {
    expect(numberDisappeared([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6]);
  });

  it("permutation", function () {
    const permutes = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ];
    expect(permutation([1, 2, 3])).toEqual(jasmine.arrayContaining(permutes));
  });

  it("diameter of tree", function () {
    const tree = arrayToTree([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(diameterOfBinaryTree(tree)).toEqual(5);
  });

  it("generate all possible parenthesis", function () {
    expect(generateParenthesis(1)).toEqual(["()"]);
    expect(generateParenthesis(2)).toEqual(["(())", "()()"]);
    expect(generateParenthesis(3)).toEqual(["((()))", "(()())", "(())()", "()(())", "()()()"]);
  });

  it("reverse only letter in word", function () {
    expect(reverseWords("Let's take LeetCode contest")).toEqual("s'teL ekat edoCteeL tsetnoc");
  });

  it("convert BST to great tree", function () {
    const srcTree = arrayToTree([4, 2, 6, 1, 3, 5, 7]);
    const tarTree = arrayToTree([22, 27, 13, 28, 25, 18, 7])
    expect(treeToArray(convertBST(srcTree))).toEqual(treeToArray(tarTree));
  })


  it("is substree", function () {
    const tree = arrayToTree([4, 2, 6, 1, 3, 5, 7, 8]);
    const subtree = arrayToTree([6, 5, 7]);
    const nonSubtree = arrayToTree([2, 1, 3]);
    expect(isSubtree(tree, subtree)).toEqual(true);
    expect(isSubtree(tree, nonSubtree)).toEqual(false);
  })

  it("is palindrome link", function () {
    const link1 = arrayToLink([1, 2, 3, 2, 1]);
    const link2 = arrayToLink([1, 2, 3, 3, 2, 1]);
    const link3 = arrayToLink([1, 2, 3, 4, 2, 1]);
    expect(isPalindrome(link1)).toEqual(true);
    expect(isPalindrome(link2)).toEqual(true);
    expect(isPalindrome(link3)).toEqual(false);
  })

  it("get link intersection", function () {
    const link1 = arrayToLink([1, 2, 3]);
    const link2 = arrayToLink([1, 2]);
    const link3 = arrayToLink([4, 5]);
    const link4 = arrayToLink([6, 7]);
    expect(linkToArray(link1.add(link3))).toEqual([1, 2, 3, 4, 5]);
    expect(linkToArray(link2.add(link3))).toEqual([1, 2, 4, 5]);
    expect(getIntersectionNode(link1, link2)).toEqual(link3);
    expect(getIntersectionNode(link1, link3)).toEqual(link3);
    expect(getIntersectionNode(link2, link3)).toEqual(link3);
    expect(getIntersectionNode(link1, link4)).toEqual(null);
  })

  it("sum target in sorted array", function () {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it("merge tow sorted list", function () {
    const link1 = arrayToLink([1, 3, 5]);
    const link2 = arrayToLink([2, 4, 6]);
    expect(linkToArray(mergeTwoLists(link1, link2))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("find common node", function () {
    const bstTree = arrayToTree([6, 2, 8, 0, 4, 7, 9]);
    expect(lowestCommonAncestor(bstTree, bstTree.left.left, bstTree.right.right)).toEqual(bstTree);
    expect(lowestCommonAncestor(bstTree, bstTree.right.left, bstTree.right.right)).toEqual(bstTree.right);
  })

  it("find common node", function () {
    const bstTree = arrayToTree([6, 2, 8, 0, 4, 7, 9]);
    expect(lowestCommonAncestor(bstTree, bstTree.left.left, bstTree.right.right)).toEqual(bstTree);
    expect(lowestCommonAncestor(bstTree, bstTree.right.left, bstTree.right.right)).toEqual(bstTree.right);
  })

  it("is valid parentheses", function () {
    expect(isValidParentheses('()[]{}')).toEqual(true);
    expect(isValidParentheses('([)]')).toEqual(false);
  })

  it("count primes", function () {
    expect(countPrimes(3)).toEqual(1);
    expect(countPrimes(4)).toEqual(2);
    expect(countPrimes(15)).toEqual(6);
  })

  // it("stack retrieve the minimum element in constant time", function () {
  //   const minStack = new MinStack();
  //   minStack.push(-2);
  //   minStack.push(0);
  //   minStack.push(-3);
  //   expect(minStack.getMin()).toEqual(-3);
  //   minStack.pop();
  //   expcet(minStack.top()).toEqual(0);
  //   expcet(minStack.getMin()).toEqual(-2);
  // })

  /* 
    c = newSize.height / size.height
    x' = x
    y' = y * c
    regions.width' = size.width
    regions.height' = size.height * c 
  */
  it("handle input", function () {
    let input = {
      originPoster: {
        size: {
          width: 900,
          height: 500,
        },
        regions: [
          { x: 32, y: 283, width: 531, height: 89 },
          { x: 43, y: 255, width: 512, height: 32 },
          { x: 43, y: 375, width: 519, height: 97 }
        ]
      },
      newSize: {
        width: 1900,
        height: 1500,
      }
    };
    let k = 1;
    let output = {
      size: {
        width: 1900,
        height: 1500,
      },
      regions: [
        { x: 32, y: 849, width: 531, height: 267 },
        { x: 43, y: 765, width: 512, height: 96 },
        { x: 43, y: 1125, width: 519, height: 291 }
      ]
    }
    expect(handleInput(input, k)).toEqual(output);
  })

  fit("count primes", function () {
    let mean = 0,
      variance = 1;
    let distribution = gaussian(mean, variance);
    let point1 = 0;
    let point2 = 0.5;
    // Take a random sample using inverse transform sampling method.
    let samplePdf1 = distribution.pdf(point1);
    let samplePdf2 = distribution.pdf(point2);
    let sampleCdf1 = distribution.cdf(point1);
    let sampleCdf2 = distribution.pdf(point2);
    console.log(`pdf: ${point1} ${samplePdf1}`);
    console.log(`pdf: ${point2} ${samplePdf2}`);
    console.log(`cdf: ${point1} ${sampleCdf1}`);
    console.log(`cdf: ${point2} ${sampleCdf2}`);
  })
});
