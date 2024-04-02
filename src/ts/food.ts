type Points = {
  x: number;
  y: number;
};
class Food {
  constructor(public snakePoints: Points[], public boardDimension: Points) {}

  get getFoodPoints(): any {
    let numX = this.generateRandom(this.boardDimension.x);
    let numY = this.generateRandom(this.boardDimension.y);

    const isIncluded: boolean = this.snakePoints.some(
      (pt) => pt.x === numX && pt.y === numY
    );

    if (isIncluded) {
      return this.getFoodPoints;
    }

    return { x: numX, y: numY };
  }

  generateRandom(max: number) {
    let num: number = Math.floor(Math.random() * max) + 1;
    return num;
  }
}

export { Food };
