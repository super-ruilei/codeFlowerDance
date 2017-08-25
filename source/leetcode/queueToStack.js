/*
Easy
Implement the following operations of a stack using queues.
Push O(1)
Pop O(n)
*/
var MyStack = function () {
  this.inqueue = [];
  this.outqueue = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.inqueue.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  while (this.inqueue.length > 1) {
    this.outqueue.push(this.inqueue.shift());
  }
  [this.inqueue, this.outqueue] = [this.outqueue, this.inqueue];
  return this.outqueue.pop();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  while (this.inqueue.length > 1) {
    this.outqueue.push(this.inqueue.shift());
  }
  [this.inqueue, this.outqueue] = [this.outqueue, this.inqueue];
  let top = this.outqueue[0];
  this.inqueue.push(this.outqueue.shift());
  return top;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.inqueue.length === 0 && this.outqueue.length === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = Object.create(MyStack).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

export default MyStack;
