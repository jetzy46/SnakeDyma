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
let apple = [5, 5];

// on initialise la direction du snake
let direction = "n";

// on définit la vitesse du snake
let speed = 300;

let score = 0;

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
    (apple[1] + 0.5) * grid,
    (800 / grid) * 0.5,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.closePath();
};

const drawScore = () => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "200px sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(score, grid * 10, grid * 10);
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
  } else {
    const [head, ...body] = snake;
    for (let bodyElem of body) {
      if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
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

const generateApple = () => {
  const [x, y] = [
    Math.trunc(Math.random() * 19),
    Math.trunc(Math.random() * 19),
  ];
  apple = [x, y];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
};

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
  // on vérifie si on mange la pomme
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
    score++;
  } else {
    snake.pop();
  }
  return gameOver();
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, speed);
  } else {
    alert("perdu");
    score = 0;
  }
};

requestAnimationFrame(move);
