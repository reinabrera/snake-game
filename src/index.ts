import "./styles/index.scss";
import { BoardGame } from "./ts/boardGame";
import startSound from "./assets/start.mp3";
import eatSound from "./assets/eat.mp3";
import gameOverSound from "./assets/game-over.mp3";

const boardGameElement = document.querySelector("#gameboard") as HTMLElement;
const gameOptions = document.querySelector("#game-options") as HTMLElement;
const startDiv = gameOptions.querySelector(".start-game") as HTMLElement;
const restartDiv = gameOptions.querySelector(".play-again") as HTMLElement;
const startBtn = gameOptions.querySelector("#start") as HTMLElement;
const restartBtn = gameOptions.querySelector("#restart") as HTMLElement;
const startAudio = new Audio(startSound);
const gameOverAudio = new Audio(gameOverSound);
const eatAudio = new Audio(eatSound);

const speed: number = 6;
let lastRenderTime: number;
const boardgame = new BoardGame(boardGameElement, { x: 21, y: 21 }, 5);

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp") {
    boardgame.snake.setDirection("up");
  } else if (e.code === "ArrowDown") {
    boardgame.snake.setDirection("down");
  } else if (e.code === "ArrowLeft") {
    boardgame.snake.setDirection("left");
  } else if (e.code === "ArrowRight") {
    boardgame.snake.setDirection("right");
  }
});

const gameLoop = (currentTime: number): void => {
  if (boardgame.isGameOver) {
    gameOverAudio.play();
    restartDiv.style.display = "block";
    const score = restartDiv.querySelector(".score") as HTMLElement;
    score.innerText = `Score: ${boardgame.snake.points.length}`;
    boardGameElement.classList.toggle("blur");
    return;
  }

  window.requestAnimationFrame(gameLoop);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / speed) {
    return;
  }
  boardgame.runGame();

  if (boardgame.isFoodEaten) {
    eatAudio.currentTime = 0;
    eatAudio.play();
  }

  lastRenderTime = currentTime;
};

startBtn.addEventListener("click", () => {
  startAudio.play();
  boardGameElement.classList.toggle("blur");
  startDiv.style.display = "none";
  window.requestAnimationFrame(gameLoop);
});

restartBtn.addEventListener("click", () => {
  startAudio.play();
  restartDiv.style.display = "none";
  boardGameElement.classList.toggle("blur");
  window.requestAnimationFrame(gameLoop);
  boardgame.restartGame();
});
