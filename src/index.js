import "./style.css";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//VARIABLES __________

// on défini le nombre de colonne et rangée dans le canvas
const grid = 40;
// on initialise la position du snake
const snake = [
  [9, 9],
  [9, 10],
  [9, 11],
];
// on défini la pomme
const apple = [5, 5];

// on initialise la direction du snake
let direction = "n";

// on définit la vitesse du snake
let speed = 300;

//DESSINS __________

// on dessine la map
const drawMap = () => {
  ctx.fillStyle = "#7f8c8d";
  ctx.fillRect(0, 0, 800, 800);
};

// on dessine le snake
const drawSnake = () => {
  ctx.fillStyle = "#44bd32";
  for (let body of snake) {
    ctx.fillRect(body[0] * grid, body[1] * grid, grid, grid);
  }
};

// on dessin la pomme
const drawApple = () => {
  ctx.beginPath();
  ctx.fillStyle = "#EA2027";
  ctx.arc(
    (apple[0] + 0.5) * grid,
    (apple[1] - 0.5) * grid,
    (800 / grid) * 0.5,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.closePath();
};

// CONDITIONS DE DEFAITES

const gameOver = () => {
  if (
    snake[0][0] > 19 ||
    snake[0][0] < 0 ||
    snake[0][1] > 19 ||
    snake[0][1] < 0
  ) {
    return true;
  }
};

//CONTROLES __________

// on ecoute les touches
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "z": {
      direction = "n";
      break;
    }
    case "q": {
      direction = "w";
      break;
    }
    case "s": {
      direction = "s";
      break;
    }
    case "d": {
      direction = "e";
      break;
    }
  }
});

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case "n": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "s": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
    case "e": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "w": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
  }
  snake.unshift(head);
  snake.pop();
  return gameOver();
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, speed);
  } else {
    alert("Perdu ! cheh");
  }
};

requestAnimationFrame(move);
