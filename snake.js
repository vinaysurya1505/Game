const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
const canvasSize = 400;
const tileCount = 20;  // Number of tiles
const tileSize = canvasSize / tileCount;

canvas.width = canvasSize;
canvas.height = canvasSize;

// Snake properties
let snake = [{x: 10, y: 10}];
let snakeLength = 1;
let velocityX = 0;
let velocityY = 0;
let food = {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
let score = 0;

// Game loop
function gameLoop() {
    updateSnake();
    if (checkGameOver()) {
        alert("Game Over! Final Score: " + score);
        resetGame();
        return;
    }
    drawGame();
    setTimeout(gameLoop, 100);  // Game speed
}

// Update snake position
function updateSnake() {
    // Move snake head
    let head = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};

    // Wrap snake around the canvas edges
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    snake.unshift(head);  // Add new head at the front of the snake

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;  // Increase the snake size
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        placeFood();  // Place new food
    }

    // Remove the tail if the snake exceeds its length
    while (snake.length > snakeLength) {
        snake.pop();
    }
}

// Draw the game elements
function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(part => {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Check if the snake hits its own body
function checkGameOver() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Place food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Reset the game after Game Over
function resetGame() {
    snake = [{x: 10, y: 10}];
    snakeLength = 1;
    velocityX = 0;
    velocityY = 0;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    placeFood();
}

// Control the snake using arrow keys
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (velocityY === 0) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY === 0) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX === 0) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX === 0) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

// Start the game
gameLoop();
