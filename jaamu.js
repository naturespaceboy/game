let score = 0;
let timeRemaining = 60; 

const monkey = document.getElementById('monkey');
const banana = document.getElementById('banana');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');


function updateTimer() {
    timerElement.textContent = `Time: ${timeRemaining}s`;

    if (timeRemaining > 0) {
        timeRemaining--;
        setTimeout(updateTimer, 1000); 
    } else {
        
        alert(`Game over! Your score is ${score}`);
        resetGame();
    }
}

// Start the game timer
updateTimer();

banana.addEventListener('animationiteration', () => {
    let randomPosition = Math.random() * 300;
    banana.style.left = `${randomPosition}px`;
});

document.addEventListener('keydown', (event) => {
    let monkeyPosition = window.getComputedStyle(monkey).getPropertyValue('left');
    monkeyPosition = parseInt(monkeyPosition);

    if (event.key === 'ArrowLeft' && monkeyPosition > 0) {
        monkey.style.left = `${monkeyPosition - 20}px`; 
    } else if (event.key === 'ArrowRight' && monkeyPosition < 700) {
        monkey.style.left = `${monkeyPosition + 20}px`;
    }

    checkCollision();
});

function checkCollision() {
    let monkeyPosition = window.getComputedStyle(monkey);
    let bananaPosition = window.getComputedStyle(banana);

    if (parseInt(bananaPosition.top) >= 700 && parseInt(bananaPosition.left) >= parseInt(monkeyPosition.left) && parseInt(bananaPosition.left) <= (parseInt(monkeyPosition.left) + 80)) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
}

function resetGame() {
    score = 0;
    timeRemaining = 60;
    scoreElement.textContent = `Score: ${score}`;
    updateTimer();
}
