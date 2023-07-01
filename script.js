const RANDOM_QUOTE_API = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const resultsElement = document.getElementById('results');
var startButton = document.getElementById('startButton');
var container = document.querySelector('.container');
let totalCharactersTyped = 0;

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct && arrayValue.length === arrayQuote.length) {
        totalCharactersTyped += quoteInputElement.value.length;
        renderNewQuote(); // Render new quote after the current quote is finished
    }
});

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote() {
    quoteInputElement.value = ''; // Clear the input after the quote is finished
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
}

function startTimer() {
    totalCharactersTyped = 0;
    timerElement.innerText = 0;
    startTime = new Date();
    let timerInterval;
    
    timerInterval = setInterval(() => {
        const elapsedTime = getTimerTime();
        timerElement.innerText = elapsedTime;
        if (elapsedTime >= 60) {
            clearInterval(timerInterval);
            resultsElement.innerText = `Times up! \u{1F641} Total characters typed: ${totalCharactersTyped}`;
            renderNewQuote(); // Render new quote after the timer is completed
        }
    }, 1000);

    setTimeout(showResultTab, 60000); // Show the result tab after 60 seconds
}


function showResultTab() {
    const resultTab = document.getElementById("results");
    resultTab.style.display = "block"; // Display the result tab
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

startButton.addEventListener('click', function() {
    startButton.style.display = 'none'; // hides the start button after clicking
    typingGifContainer.style.display = 'none'; // hides the div with the GIF after clicking the button
    container.style.display = 'block'; // shows the division after clicking the button
    renderNewQuote();
    startTimer();
});

