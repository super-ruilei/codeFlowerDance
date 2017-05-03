var singleton = fn => {
  var res;
  return () => res || (res = fn.apply(this, arguments));
}

var createMask = singleton(() => document.body.appendChild(document.createElement('div')));
