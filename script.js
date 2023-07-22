const RANDOM_QUOTE_API = 'https://api.quotable.io/random';
const RANDOM_WORD_API = 'https://random-words-api.vercel.app/word';
const quoteDisplayElement = document.getElementById('quoteDisplay'); 
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const resultsElement = document.getElementById('results');
var startButton = document.getElementById('startButton');
var startbutton2 = document.getElementById('startButton2');
const submitButton = document.getElementById("button-submitted");
const startContainer = document.querySelector(".start-container");
var container = document.querySelector('.container');
const greetingContainer = document.querySelector('.greeting-container');
const formContainer = document.getElementById('form-container')
let totalCharactersTyped = 0;
let correctWords = 0;
const preventCopyPasteContainer = document.getElementById("preventCopyPaste");

// Disable copy event
preventCopyPasteContainer.addEventListener("copy", function(event) {
  event.preventDefault();
});

// Disable cut event
preventCopyPasteContainer.addEventListener("cut", function(event) {
  event.preventDefault();
});

// Disable paste event
preventCopyPasteContainer.addEventListener("paste", function(event) {
  event.preventDefault();
})

submitButton.addEventListener("click", function(event) {
    // Prevent form submission (if using within a form)
    event.preventDefault();
  
    // Hide the submit button
    submitButton.style.display = "none";
  
    // Show the start container
    startContainer.style.display = "block";

    //hide thw form
    formContainer.style.display = 'none'
    
  });

let quoteMode = true;

const quoteModeInputEventListener = () => {
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
        const valueWithoutSpaces = quoteInputElement.value.replace(/\s/g, '');
        totalCharactersTyped += valueWithoutSpaces.length;
        renderNewQuote(); // Render new quote after the current quote is finished
    }
};

const wordModeInputEventListener = () => {
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
        const valueWithoutSpaces = quoteInputElement.value.replace(/\s/g, '');
        totalCharactersTyped += valueWithoutSpaces.length;
        renderNewWord(); // Render new word after the current word is finished
    }
};

quoteInputElement.addEventListener('input', quoteModeInputEventListener);

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(data => data.content);
}

function getRandomWord() {
    return fetch(RANDOM_WORD_API)
        .then(response => response.json())
        .then(data => data[0].word); // Access the "word" property from the first element of the array
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

async function renderNewWord() {
    quoteInputElement.value = ''; // Clear the input after the quote is finished
    const quote = await getRandomWord();
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
            resultsElement.innerText = `Times up! \u{1F641}\nYou typed: ${totalCharactersTyped} chars in a minute! \u{1F600}\u{1F44D}`;
            renderNewQuote(); // Render new quote after the timer is completed
        }
    }, 1000);

    setTimeout(showResultTab, 60000); // Show the result tab after 60 seconds
}

function startTimer2() {
    totalCharactersTyped = 0;
    timerElement.innerText = 0;
    startTime = new Date();
    let timerInterval;
    
    timerInterval = setInterval(() => {
        const elapsedTime = getTimerTime();
        timerElement.innerText = elapsedTime;
        if (elapsedTime >= 60) {
            clearInterval(timerInterval);
            resultsElement.innerText = `Times up! \u{1F641}\nYou typed: ${totalCharactersTyped} chars in a minute! \u{1F600}\u{1F44D}`;
            renderNewWord(); // Render new quote after the timer is completed
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
    // Start in quote mode
    quoteMode = true;
    quoteInputElement.removeEventListener('input', wordModeInputEventListener);
    quoteInputElement.addEventListener('input', quoteModeInputEventListener);
    startButton.style.display = 'none';
    formContainer.style.display = 'none'
    container.style.display = 'block';
    greetingContainer.style.display = 'none';
    renderNewQuote();
    startTimer();
});

startbutton2.addEventListener('click', function() {
    // Start in word mode
    quoteMode = false;
    quoteInputElement.removeEventListener('input', quoteModeInputEventListener);
    quoteInputElement.addEventListener('input', wordModeInputEventListener);
    startButton.style.display = 'none';
    startbutton2.style.display = 'none'
    formContainer.style.display = 'none'
    container.style.display = 'block';
    greetingContainer.style.display = 'none';
    renderNewWord();
    startTimer2();
});
