const RANDOM_QUOTE_API = 'http://api.quotable.io/random'

function getRandomQuote(){
   return fetch(RANDOM_QUOTE_API)
    .then(response => response.json())
    .then(data => data.content )
}

async function getNextQuote(){
    const quote = await getRandomQuote()
    console.log(quote)
}

getNextQuote()