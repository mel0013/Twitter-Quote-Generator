// Get quotes from API
// asynchronous function
// await prevents response from being undefined until fetch has captured the data
// create apiQuotes as a global variable so it's available for every function
// value changes for every fetch so use let
// select a quote from array console.log(apiQuotes[12]); this is a manual process
// you want randomised and single quote only. create a new function - newQuote

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

// SHOW LOADING
// loader is not hidden (false), you will only see the loader not the quote container
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// HIDE LOADING
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// SHOW NEW QUOTE
function newQuote() {
  loading();
  //pick a random quote
  // wrap Math.random in Math.floor to ensure it's a whole number
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if author field is null (!quote.author or quote.author === null)
  // replace with "anonymous"
  if (!quote.author) {
    authorText.textContent = '~Anonymous'
  } else {
    authorText.textContent = quote.author;
  };

  // Check quote length for styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  };
  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// If you want to use localQuotes instead of API
// Make sure you comment let apiQuotes too
// function newQuote() {
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   if (!quote.author) {
//     authorText.textContent = '~Anonymous'
//   } else {
//     authorText.textContent = quote.author;
//   };

//   // Check quote length for styling
//   if (quote.text.length > 120) {
//     quoteText.classList.add('long-quote')
//   } else {
//     quoteText.classList.remove('long-quote')
//   };
//   quoteText.textContent = quote.text;
// }


// GET QUOTES FROM API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here eg alert(error)
  }
}

// TWEET QUOTE
// on Twitter API doc use the tweet link
// window.open the url and _blank to open a new tab
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// EVENT LISTENERS for the buttons
// pass the newquote and tweetquote functions as the event
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);


// ON LOAD
getQuotes();
