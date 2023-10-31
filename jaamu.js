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

updateTimer();

function moveBanana() {
    let randomPosition = Math.random() * 300;
    banana.style.left = `${randomPosition}px`;

    requestAnimationFrame(moveBanana);
}

moveBanana();

document.addEventListener('keydown', (event) => {
    let monkeyPosition = window.getComputedStyle(monkey);
    let monkeyLeft = parseFloat(monkeyPosition.left);

    if (event.key === 'ArrowLeft') {
        if (monkeyLeft > 0) {
            monkey.style.left = `${monkeyLeft - 20}px`;
        }
    } else if (event.key === 'ArrowRight') {
        if (monkeyLeft < 320) {
            monkey.style.left = `${monkeyLeft + 20}px`;
        }
    }

    checkCollision();
});

function checkCollision() {
    let monkeyPosition = window.getComputedStyle(monkey);
    let bananaPosition = window.getComputedStyle(banana);

    let monkeyLeft = parseFloat(monkeyPosition.left);
    let monkeyRight = monkeyLeft + parseFloat(monkeyPosition.width);
    let bananaLeft = parseFloat(bananaPosition.left);

    if (
        parseFloat(bananaPosition.top) >= 370 &&
        bananaLeft >= monkeyLeft &&
        bananaLeft <= monkeyRight
    ) {
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
