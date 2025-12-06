// Backup words for testing or fallback
const backupWords = [
    "AGREEMENT", "BUDGET", "CONTRACT", "DEADLINE", "EXECUTIVE", 
    "FEEDBACK", "GROWTH", "HIRE", "INCOME", "JOB"
];

let words = []; // words fetched from API or DB
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// API (Asynchronous)
async function fetchWords() {
    showLoading(true);
    try {
        const response = await fetch('/api/words');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const filteredData = data
                .map(w => String(w).toUpperCase())
                .filter(word => word.length > 4 && /^[A-Z]+$/.test(word));

            if (filteredData.length > 0) {
                words = filteredData;
                console.log("Loaded " + words.length + " words from local DB");
            } else {
                throw new Error('No valid words found in DB');
            }
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error("DB/API Error, using backup words:", error);
        words = backupWords;
        const banner = document.getElementById('apiBanner');
        const bannerText = document.getElementById('apiBannerText');
        if (banner && bannerText) {
            bannerText.textContent = 'ไม่สามารถเชื่อมต่อฐานข้อมูลคำศัพท์ภายในเครื่อง — ใช้คำสำรองแทน';
            banner.classList.remove('hidden');
        } else {
            alert('ไม่สามารถเชื่อมต่อฐานข้อมูลคำศัพท์ — ใช้คำสำรองแทน');
        }
    } finally {
        showLoading(false);
        playRound();
    }
}

function showLoading(isLoading) {
    const overlay = document.getElementById('loadingOverlay');
    if (isLoading) overlay.classList.remove('hidden');
    else overlay.classList.add('hidden');
}

// --- Canvas & Graphics ---
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGallows();
}

function drawLine(fromX, fromY, toX, toY) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#1e293b";
    ctx.lineCap = "round";
    ctx.stroke();
}

function drawCircle(x, y, r) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#1e293b";
    ctx.stroke();
}

function drawGallows() {
    drawLine(20, 270, 230, 270);
    drawLine(50, 270, 50, 30);
    drawLine(50, 30, 150, 30);
    drawLine(150, 30, 150, 50);
}

function drawHangman(step) {
    switch(step) {
        case 1: drawCircle(150, 75, 25); break;
        case 2: drawLine(150, 100, 150, 190); break;
        case 3: drawLine(150, 120, 110, 150); break;
        case 4: drawLine(150, 120, 190, 150); break;
        case 5: drawLine(150, 190, 110, 230); break;
        case 6: drawLine(150, 190, 190, 230); break;
    }
}

// --- Game Logic ---

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `<button
            class="letter-btn bg-white text-indigo-700 font-bold py-2 rounded shadow-md hover:bg-indigo-100 transition active:translate-y-1 text-lg"
            id='${letter}'
            onClick="handleGuess('${letter}')"
        >
            ${letter}
        </button>`
    ).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    if (guessed.indexOf(chosenLetter) !== -1 || mistakes === maxWrong) return;

    guessed.push(chosenLetter);
    const btn = document.getElementById(chosenLetter);
    if (btn) btn.setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessWord();
        checkIfGameWon();
    } else {
        mistakes++;
        updateMistakes();
        drawHangman(mistakes);
        checkIfGameLost();
    }
}

function guessWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "&nbsp;")).join('</u><u class="word-slot">');
    document.getElementById('wordSpotlight').innerHTML = '<u class="word-slot">' + wordStatus + '</u>';
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function checkIfGameWon() {
    const currentWordState = document.getElementById('wordSpotlight').innerText.replace(/\s/g, ''); 
    if (currentWordState === answer) {
        document.getElementById('gameStatus').innerHTML = '<span class="text-green-400">🎉 Correct! (' + answer + ')</span>';
        document.getElementById('keyboard').innerHTML = ''; 
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = '<span class="text-red-300 text-2xl">เฉลย: ' + answer + '</span>';
        document.getElementById('gameStatus').innerHTML = '<span class="text-red-500">💀 Game Over</span>';
        document.getElementById('keyboard').innerHTML = '';
    }
}

function playRound() {
    mistakes = 0;
    guessed = [];
    document.getElementById('gameStatus').innerHTML = '';
    
    randomWord();
    guessWord();
    updateMistakes();
    generateButtons();
    clearCanvas();
}

function resetGame() {
    if (words.length === 0) {
        fetchWords();
    } else {
        playRound();
    }
}

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase();
    if (event.keyCode >= 65 && event.keyCode <= 90 && mistakes < maxWrong) {
         const btn = document.getElementById(letter);
         if (btn && !btn.disabled) handleGuess(letter);
    }
});

// Start
window.onload = function() {
    fetchWords(); 
};

// Banner close handler
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'apiBannerClose') {
        const banner = document.getElementById('apiBanner');
        if (banner) banner.classList.add('hidden');
    }
});
