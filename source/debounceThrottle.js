// 1.Debounce: N秒后响应一次(timeout 执行)
// debounce function that will wrap our event
var debounce = (fn, delay, timer = null) => (...args) => {
  // if event is called, clear the timer and start over
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn.apply(this, args);
  }, delay);
}


// 2. Throttle: N秒内立刻相应一次(timeout 清除标志位)
var throttle = (func, limit, inThrottle) => (...args) => {
  if (!inThrottle) {
    func.apply(this, args);
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
    }, limit);
  }
}

// 3. How To Use
// function to be called when user scrolls
function foo() {
  console.log('You are scrolling!');
}

// wrap our function in a debounce to fire once 2 seconds have gone by
var elem = document.getElementById('logo');
elem.addEventListener('scroll', debounce(foo, 2000));
