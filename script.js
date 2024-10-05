
const $ = (id) => document.getElementById(id);
const zeroPadding = (num) => String(num).padStart(2, '0');

function clock() {  
    const today = new Date();  
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    const ampm = h < 12 ? 'AM' : 'PM';

    $('hours').innerHTML = zeroPadding(h);
    $('min').innerHTML = zeroPadding(m);
    $('sec').innerHTML = zeroPadding(s);
    $('ampm').innerHTML = ampm;

}

setInterval(clock, 1000);
clock(); 

document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('formatted-date');
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    const formattedDate = `${day} / ${month} / ${year}`;
    dateElement.textContent = formattedDate;
});


function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateSquareRoot() {
    const display = document.getElementById('display');
    display.value = Math.sqrt(eval(display.value));
}


function calculate() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

const startBtn = document.getElementById('start-btn');
const display = document.getElementById('display');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    console.log('Voice recognition started. Try speaking into the microphone.');
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    display.value = transcript;
    processSpeech(transcript);
};

startBtn.addEventListener('click', () => {
    recognition.start();
});

function processSpeech(transcript) {
    try {
        const result = eval(transcript.replace('multiply', '*').replace('divide', '/').replace('plus', '+').replace('minus', '-'));
        display.value = result;
    } catch (error) {
        display.value = 'Error in processing speech';
    }
}

let openBracket = true;

function toggleBracket() {
    const display = document.getElementById('display');
    const currentValue = display.value;
    
    if (openBracket) {
        if (/\d|\)/.test(currentValue.slice(-1))) {
            display.value += '*(';
        } else {
            display.value += '(';
        }
        openBracket = false;
    } else {
        display.value += ')';
        openBracket = true;
    }
}


