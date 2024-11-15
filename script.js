const target = document.getElementById('target');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const timerElement = document.getElementById('timer');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const gameContainer = document.getElementById('game-container');
const comboIndicator = document.getElementById('combo-indicator');
const powerUpsIndicator = document.getElementById('power-ups');

let score = 0;
let highScore = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let powerUpInterval;
let currentCombo = 0;
let highestCombo = 0;
let targetsHit = 0;
let powerUpsCollected = 0;
let activePowerUps = new Set();
let lastClickTime = 0;
let difficultySettings = {
    easy: { interval: 1500, size: 50 },
    medium: { interval: 1000, size: 40 },
    hard: { interval: 750, size: 30 },
    impossible: { interval: 500, size: 20 }
};

const powerUpTypes = {
    doublePoints: { color: '#ffdd00', duration: 5000, symbol: '2x' },
    slowMotion: { color: '#00ffff', duration: 3000, symbol: '⏰' },
    bigTarget: { color: '#ff00ff', duration: 4000, symbol: '⭕' }
};

function createScorePopup(x, y, points) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${points}`;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    gameContainer.appendChild(popup);
    
    setTimeout(() => popup.remove(), 1000);
}

function spawnPowerUp() {
    if (Math.random() < 0.3) { // 30% chance to spawn power-up
        const powerUp = document.createElement('div');
        powerUp.className = 'power-up';
        const powerUpType = Object.keys(powerUpTypes)[Math.floor(Math.random() * Object.keys(powerUpTypes).length)];
        powerUp.dataset.type = powerUpType;
        powerUp.style.backgroundColor = powerUpTypes[powerUpType].color;
        
        const containerWidth
