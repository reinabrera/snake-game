type Points = {
  x: number;
  y: number;
};

class Snake {
  public direction: Points = { x: 0, y: 0 };
  private lastDirection: Points = { x: 0, y: 0 };
  public isIntersected: boolean = false;
  public isCrashed: boolean = false;
  public points: Points[] = this.getStartingSnakePoints();
  constructor(public dimensions: Points, public snakeMinLength: number) {}

  move() {
    let newDirection = { ...this.direction };

    if (
      (newDirection.x === 1 && this.lastDirection.x === -1) ||
      (newDirection.x === -1 && this.lastDirection.x === 1) ||
      (newDirection.y === -1 && this.lastDirection.y === 1) ||
      (newDirection.y === 1 && this.lastDirection.y === -1)
    ) {
      newDirection = { ...this.lastDirection };
    }

    for (let i = this.points.length - 1; i >= 0; i--) {
      if (i === 0) {
        this.points[i] = {
          x: this.points[i].x + newDirection.x,
          y: this.points[i].y + newDirection.y,
        };
        if (
          this.points[i].x === 0 ||
          this.points[i].x === 22 ||
          this.points[i].y === 0 ||
          this.points[i].y === 22
        ) {
          this.isCrashed = true;
          break;
        }
      } else {
        if (
          this.points[0].x === this.points[i].x &&
          this.points[0].y === this.points[i].y
        ) {
          this.isIntersected = true;
          break;
        }
        this.points[i] = this.points[i - 1];
      }
    }

    this.lastDirection = newDirection;
  }

  getStartingSnakePoints() {
    const point: Points[] = [
      {
        x: this.getRandomNumber(this.snakeMinLength, this.dimensions.x),
        y: this.getRandomNumber(this.snakeMinLength, this.dimensions.y),
      },
    ];

    const directions: string[] = ["left", "right", "up", "down"];

    const selectedDirection: string =
      directions[Math.floor(Math.random() * directions.length)];

    this.setDirection(selectedDirection);

    for (let i = 0; i < 4; i++) {
      point.push({
        x: point[point.length - 1].x - this.direction.x,
        y: point[point.length - 1].y - this.direction.y,
      });
    }
    return point;
  }

  getRandomNumber(min: number, max: number) {
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
  }

  setDirection(direction: string) {
    if (direction === "left") {
      this.direction = { x: -1, y: 0 };
    } else if (direction === "right") {
      this.direction = { x: 1, y: 0 };
    } else if (direction === "up") {
      this.direction = { x: 0, y: -1 };
    } else if (direction === "down") {
      this.direction = { x: 0, y: 1 };
    }
  }

  increaseLength() {
    this.points.push(this.points[this.points.length - 1]);
  }
}

export { Snake };
