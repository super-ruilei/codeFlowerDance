// https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8
/*
Application: The process of applying a function to its arguments in order to produce a return value.
Partial Application: Takes a function with multiple parameters and returns a function with fewer parameters.
Curry: A function that takes a function with multiple parameters as input and returns a function with exactly one parameter.

Difference:  function type uniformity
A partial application may or may not have a predictable return type
A curried function always returns another function with an arity of 1 until all of the arguments have been applied
*/

//curried functions have a built-in iterator mechanism
const next = a(b);
doSomeStuff().then(() => next(c));

/*------------------------------------------------------------------------------------------------------------------------------*/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0
console.log(toSlug('JS Cheerleader')) // 'js-cheerleader'

// Simple implementation with points style
const toSlug = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);

// Function Compositions with points-free style
const toSlug = pipe(
  trace('input'),
  split(' '),
  map(toLowerCase),
  trace('after map'),
  join('-'),
  encodeURIComponent
);

// a. composable forms of common utilities by curry (partial fn actually here)
const curry = fn => (...args) => fn.bind(null, ...args);
const map = curry((fn, arr) => arr.map(fn));
const join = curry((str, arr) => arr.join(str));
const toLowerCase = str => str.toLowerCase();
const split = curry((splitOn, str) => str.split(splitOn)); // import { curry, map, join, split } from 'lodash/fp';

const toSlug = input => encodeURIComponent(
  join('-')(
    map(toLowerCase)(
      split(' ')(
        input
      )
    )
  )
);

// b. Implement compose using reduce
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);  // import { compose } from 'lodash/fp';
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);          // import { pipe } from 'lodash/fp';

// c. trace for debug & tap for flowing through the pipe
const tap = curry((fn, x) => {
  fn(x);
  return x;
});

const trace = label => {
  return tap(x => console.log(`== ${ label }:  ${ x }`));
};

const toSlug = pipe(
  trace('input'),
  split(' '),
  map(toLowerCase),
  trace('after map'),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader'));
// '== input:  JS Cheerleader'
// '== after map:  js,cheerleader'
// 'js-cheerleader'

/*------------------------------------------------------------------------------------------------------------------------------*/
// https://medium.com/javascript-scene/familiarity-bias-is-holding-you-back-its-time-to-embrace-arrow-functions-3d37e1a9bb75

// ES5-style
var composeMixins = function () {
  var mixins = [].slice.call(arguments);
  return function (instance, mix) {
    if (!instance) instance = {};
    if (!mix) {
      mix = function () {
        var fns = [].slice.call(arguments);
        return function (x) {
          return fns.reduce(function (acc, fn) {
            return fn(acc);
          }, x);
        };
      };
    }
    return mix.apply(null, mixins)(instance);
  };
};

// legacy function style
const pipe = function (...fns) {
  return function (x) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, x);
  };
};

const composeMixins = function (...mixins) {
  return function (
    instance = {},
    mix = pipe
  ) {
    return mix(...mixins)(instance);
  };
};

// curried with arrows
const composeMixins = (...mixins) => (
  instance = {},
  mix = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)
) => mix(...mixins)(instance);

/*
First:
  Arrow functions don’t bind 'this'.
  They don’t even have their own 'this' context.
  In arrow functions, 'this' is always delegated to the lexical context.
Second:
  A major motivation for arrow functions was to create more concise syntax for lambda expressions…
  (in-line function definitions for things like argument and return values for higher-order functions)

*/
