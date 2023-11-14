var timerLimit = 60;
var score = 0;
var hitRn = 0;
var gameRunning = false;
var bubbleTimeout;

// Start Game
function playBtn() {
    score = 0;
    timerLimit = 60;
    gameRunning = true;

    document.querySelector("#score").textContent = score;
    document.querySelector("#timer").textContent = timerLimit;
    document.querySelector("#hit").textContent = "0";
    document.querySelector("#pBtm").innerHTML = `<div class="result"><button class="btn" onclick="game()">Play</button> <ul>
    <li>Hit the bubbles with the matching number within the time limit to score points.</li>
    <li>If you fail to hit bubbles within 5 seconds, you'll lose 5 points.</li>
</ul>
</div>`;
}

// To Start Game
function game() {
    makeBubbles();
    hitVal();
    runTimer();
}

// Random Hit Number
function hitVal() {
    hitRn = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = hitRn;
}

// Bubble 
function makeBubbles() {
    var clutter = "";
    for (var i = 1; i <= 42; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble flex">${rn}</div>`;
    }
    document.querySelector("#pBtm").innerHTML = clutter;

    // Set timeout for 5 seconds
    bubbleTimeout = setTimeout(function () {
        if (gameRunning) {
            decreaseScore();
            refreshBubbles();
        }
    }, 5000);
}

// Timer
function runTimer() {
    var timerInterval = setInterval(function () {
        if (timerLimit > 0 && gameRunning) {
            timerLimit--;
            document.querySelector("#timer").textContent = timerLimit;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End Game
function endGame() {
    gameRunning = false;
    clearTimeout(bubbleTimeout); // Clear the timeout
    document.querySelector("#pBtm").innerHTML = `<div class= "result"><h1>Game Over</h1><h3>Your Score: ${score}</h3>
        <button class="btn" onclick="restartGame()">Play Again</button></div>`;
}

// Restart Game
function restartGame() {
    playBtn(); // Reuse playBtn function for restarting
    game(); // Start the game immediately
}

// Score 
function increaseScore() {
    if (gameRunning) {
        score += 10;
        document.querySelector("#score").textContent = score;
    }
}

// Score 
function decreaseScore() {
    if (gameRunning) {
        if (score >= 5) {
            score -= 5;
            document.querySelector("#score").textContent = score;
        } else {
            score = 0;
            endGame(); // Trigger endGame when the score is already at zero
        }
    }
}

// Function to refresh bubbles
function refreshBubbles() {
    makeBubbles();
    hitVal();
}

document.querySelector("#pBtm").addEventListener("click", function (details) {
    var clickedNumber = Number(details.target.textContent);
    if (clickedNumber === hitRn && gameRunning) {
        clearTimeout(bubbleTimeout); // Clear the timeout
        increaseScore();
        refreshBubbles();
    }
});

playBtn(); // Call playBtn to initialize the game
