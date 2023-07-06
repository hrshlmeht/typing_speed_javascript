const RANDOM_QUOTE_API = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const resultsElement = document.getElementById('results');
var startButton = document.getElementById('startButton');
const submitButton = document.getElementById("button-submitted");
const startContainer = document.querySelector(".start-container");
var container = document.querySelector('.container');
const greetingContainer = document.querySelector('.greeting-container');
const formContainer = document.getElementById('form-container')
let totalCharactersTyped = 0;
let correctWords = 0;

//*********function to calculate the words typed per minute.*************/
// quoteInputElement.addEventListener('input', () => {
//     const arrayQuote = quoteDisplayElement.querySelectorAll('span');
//     const typedValue = quoteInputElement.value.trim();
//     const typedWords = typedValue.split(' ');
//     let correct = true;
//     arrayQuote.forEach((characterSpan, index) => {
//         const word = typedWords[index];
//         if (word == null) {
//             characterSpan.classList.remove('correct');
//             characterSpan.classList.remove('incorrect');
//             correct = false;
//         } else if (word === characterSpan.innerText) {
//             characterSpan.classList.add('correct');
//             characterSpan.classList.remove('incorrect');
//         } else {
//             characterSpan.classList.remove('correct');
//             characterSpan.classList.add('incorrect');
//             correct = false;
//         }
//     });

//     if (correct && typedWords.length === arrayQuote.length) {
//         correctWords++;
//         renderNewQuote(); // Render new quote after the current quote is finished
//     }
// });

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
        const valueWithoutSpaces = quoteInputElement.value.replace(/\s/g, '');
        totalCharactersTyped += valueWithoutSpaces.length;
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

// timer function to calcualte words per minute
// function startTimer() {
//     totalCharactersTyped = 0;
//     timerElement.innerText = 0;
//     startTime = new Date();
//     let timerInterval;

//     timerInterval = setInterval(() => {
//         const elapsedTime = getTimerTime();
//         timerElement.innerText = elapsedTime;
//         if (elapsedTime >= 60) {
//             clearInterval(timerInterval);
//             const wordsPerMinute = Math.round(correctWords / (elapsedTime / 60));
//             resultsElement.innerText = `Times up! \u{1F641}\nYou typed: ${wordsPerMinute} words per minute! \u{1F600}\u{1F44D}`;
//             renderNewQuote(); // Render new quote after the timer is completed
//         }
//     }, 1000);

//     setTimeout(showResultTab, 60000); // Show the result tab after 60 seconds
// }

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


function showResultTab() {
    const resultTab = document.getElementById("results");
    resultTab.style.display = "block"; // Display the result tab
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    formContainer.style.display = 'none'
    container.style.display = 'block';
    greetingContainer.style.display = 'none';
    renderNewQuote();
    startTimer();
  
  });
