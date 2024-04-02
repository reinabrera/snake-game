import { Snake } from "./snake";
import { Food } from "./food";
type Points = {
  x: number;
  y: number;
};

class BoardGame {
  public isFoodEaten: boolean = true;
  public snake = new Snake(this.dimensions, this.snakeMinLength);
  public isGameOver: boolean = false;
  private food: Food = new Food(this.snake.points, this.dimensions);
  private foodPoints = this.food.getFoodPoints;
  constructor(
    public boardgame: Element,
    public dimensions: Points,
    public snakeMinLength: number
  ) {}

  runGame() {
    if (this.snake.isIntersected || this.snake.isCrashed) {
      this.gameOver();
    }
    
    if (!this.isGameOver) {
      if (this.isFoodEaten) {
        this.renderFood();
      }
      this.snake.move();
      this.checkIfFoodIsEaten();
      this.renderSnake();
    }

  }

  gameOver() {
    this.isGameOver = true;
  }

  restartGame() {
    this.snake = new Snake(this.dimensions, this.snakeMinLength);
    this.food = new Food(this.snake.points, this.dimensions);
    this.foodPoints = this.food.getFoodPoints;
    this.renderFood();
    this.isGameOver = false;
  }

  randomSnakePoints() {
    const point: Points[] = [
      {
        x: this.getRandomNumber(this.dimensions.x),
        y: this.getRandomNumber(this.dimensions.y),
      },
    ];

    const directions: string[] = ["left", "right", "up", "down"];

    const selectedDirection: string =
      directions[Math.floor(Math.random() * directions.length)];

    this.snake.setDirection(selectedDirection);
    for (let i = 0; i < 4; i++) {
      point.push({
        x: point[point.length - 1].x + 0,
        y: point[point.length - 1].y + -1,
      });
    }
  }

  getRandomNumber(max: number) {
    const randomNum = Math.floor(Math.random() * max);
    return randomNum;
  }

  checkIfFoodIsEaten() {
    if (
      this.snake.points[0].x === this.foodPoints.x &&
      this.snake.points[0].y === this.foodPoints.y
    ) {
      this.isFoodEaten = true;
      this.snake.increaseLength();
      this.foodPoints = this.food.getFoodPoints;
    }
  }

  renderSnake() {
    const snakeElements = this.boardgame.getElementsByClassName("snake");
    const snakeArray = Array.from(snakeElements);

    for (let i = 0; i < snakeArray.length; i++) {
      this.boardgame.removeChild(snakeArray[i]);
    }

    this.snake.points.forEach((pt) => {
      const div = document.createElement("div");
      div.classList.add("snake");
      div.style.gridColumn = `${pt.x} / span 1`;
      div.style.gridRow = `${pt.y} / span 1`;

      this.boardgame.appendChild(div);
    });
  }

  renderFood() {
    const foodElement = this.boardgame.getElementsByClassName("food");
    if (foodElement.length > 0) {
      this.boardgame.removeChild(foodElement[0]);
    }

    const div = document.createElement("div");
    div.classList.add("food");
    div.style.gridColumn = `${this.foodPoints.x} / span 1`;
    div.style.gridRow = `${this.foodPoints.y} / span 1`;
    this.boardgame.appendChild(div);
    this.isFoodEaten = false;
  }
}

export { BoardGame };
