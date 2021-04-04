const colors = ['blue', 'green', 'yellow', 'red', 'yellow'];
const scoresElements = document.querySelectorAll('.score');
const shadowContainer = document.querySelector('.shadowContainer');
let score = 0;
const maxBalloons = 100;
let currentBalloon = 0;
let gameOver = false;

function createBalloon() {
    const div = document.createElement('div');
    const randColor = Math.floor(Math.random() * colors.length);
    div.classList.add(`balloon`, `balloon-${colors[randColor]}`);

    const randPos = Math.floor(Math.random() * (window.innerWidth-100));

    div.style.left = randPos + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    document.body.appendChild(div);
    animateBalloon(div);
}

function animateBalloon(elem) {
    let pos = 0;
    let interval = setInterval(frame, 10 - Math.floor(score/10)); 

    function frame() {
        if(pos >= (window.innerHeight + 200) && document.querySelector('[data-number="' + elem.dataset.number+'"]') != null) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            elem.style.top = window.innerHeight - pos + 'px';
        }
    }
}

function deleteBaloon(elem) {
        playPopSound();
        elem.remove();
        score++;
        updateScore();
}
 
function updateScore() {
    for(let i = 0; i < scoresElements.length; i++) {
        scoresElements[i].textContent = score;
    }
}

//Event delegation
document.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('balloon')) {
        deleteBaloon(evt.target);
    }
});

function startGame() {
    restartGame();
    let timeout = 0;
    let loop = setInterval(function() {
        // Balloons released at random time
        timeout = Math.floor(Math.random() * 600 - 100);
        if(!gameOver && score !== maxBalloons) {
            createBalloon();
        } else if(score !== maxBalloons) {
            clearInterval(loop);
            shadowContainer.style.display = 'flex';
            shadowContainer.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop);
            shadowContainer.style.display = 'flex';
            shadowContainer.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout);
}

function restartGame() {
    const balloons = document.querySelectorAll('.balloon');
    for(let i = 0; i < balloons.length; i++) {
        balloons[i].remove();
    }
    gameOver = false;
    score = 0;
    updateScore();
    shadowContainer.style.display = 'none';
    shadowContainer.querySelector('.lose').style.display = 'none';
    shadowContainer.querySelector('.win').style.display = 'none';
}

const restartButtons = document.querySelectorAll('.restart');
for(let i = 0; i < restartButtons.length; i++) {
    restartButtons[i].addEventListener('click', startGame);
}


function playPopSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

startGame();