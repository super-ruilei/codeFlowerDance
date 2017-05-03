/*
A set of libraries for composing asynchronous and event-based programs 

RxJS = Observables + Operators + Schedulers.

Observables: represent asynchronous data streams
Operators: query asynchronous data streams like Array#extras in JavaScript
Schedulers: parameterize the concurrency in the asynchronous data streams
*/

// js: Array#extras
const source = getAsyncStockData();
const subscription = source
  .filter(quote => quote.price > 30)
  .map(quote => quote.price)
  .forEach(price => console.log(`Prices higher than $30: ${price}`));

// rxjs: The use of subscribe instead of forEach. (forEach is an alias for subscribe)
const source = getAsyncStockData();
const subscription = source
  .filter(quote => quote.price > 30)
  .map(quote => quote.price)
  .subscribe(
    price => console.log(`Prices higher than $30: ${price}`),
    err => console.log(`Something went wrong: ${err.message}`)
  );
subscription.dispose(); // When we're done

/*------------------------------------------------------------------------------------------------------------------------------*/
// fromEvent
const $input = $('#input');
const $results = $('#results');

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent($input, 'keyup')
  .pluck('target', 'value')
  .filter(text => text.length > 2);

/* Now debounce the input for 500ms */
var debounced = keyups
  .debounce(500 /* ms */ );

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = debounced
  .distinctUntilChanged();

// fromPromise
let searchWikipedia = (term) => {
  return $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise();
}

const suggestions = distinct
  .flatMapLatest(searchWikipedia);

suggestions.subscribe(
  data => {
    $results
      .empty()
      .append($.map(data[1], value => $('<li>').text(value)));
  },
  error => {
    $results
      .empty()
      .append($('<li>'))
      .text(`Error: ${error}`);
  });