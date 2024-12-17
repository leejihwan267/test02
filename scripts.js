const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 40; // 그리드 크기 40
const canvasSize = 400; // 캔버스 크기 400x400으로 설정
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let food = generateFood();
let dx = gridSize;
let dy = 0;
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "lightgreen"; // 헤드는 라임, 몸통은 연두색
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = "orange"; // 열매는 오렌지색
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }

    // Check for collisions with wall or self
    if (
        head.x < 0 ||
        head.x >= canvasSize ||
        head.y < 0 ||
        head.y >= canvasSize ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
        resetGame();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

function resetGame() {
    snake = [{ x: 160, y: 160 }];
    food = generateFood();
    dx = gridSize;
    dy = 0;
    score = 0;
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    draw();
    setTimeout(gameLoop, 150); // 속도를 150ms로 설정
}

gameLoop();
