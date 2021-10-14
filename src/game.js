import * as PIXI from 'pixi.js';
import { Circle } from './circle.js';
import { getBiliardHoll } from './gemeconfig.js';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x009334,
    });
    document.body.appendChild(this.view);
    // this.loader.add([
    //     { name: 'bunny1', url: 'assets/bunny1.png' },
    //     { name: 'bunny2', url: 'assets/bunny2.png' },
    //     { name: 'bunny3', url: 'assets/bunny3.png' },
    // ])
    this.bulean = false;
    this.time = 0;

    this.mouseDownPos = {
      x: 0,
      y: 0,
      date: new Date(),
    };
    this.mouseUpPos = {
      x: 0,
      y: 0,
      date: new Date(),
    };

    this._circles = [];

    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();

    this.ticker.add(this._animate, this);
    this.ticker.start();
  }

  _billiardTriAngle() {
    let distance = 30;

    let centerPosX = this.renderer.width / 2;
    let centerPosY = this.renderer.height / 2;

    centerPosX += (distance / 100) * window.innerWidth;

    let posY = centerPosY - 2 * 60;
    this._drawBalls(5, centerPosX, posY);

    centerPosX -= 53;
    posY += 30;
    this._drawBalls(4, centerPosX, posY);

    centerPosX -= 53;
    posY += 30;
    this._drawBalls(3, centerPosX, posY);

    centerPosX -= 53;
    posY += 30;
    this._drawBalls(2, centerPosX, posY);

    centerPosX -= 53;
    posY += 30;
    this._drawBalls(1, centerPosX, posY);

    //
    centerPosX = this.renderer.width / 2 - (distance / 100) * window.innerWidth;
    this._drawBalls(1, centerPosX, centerPosY);

    this._circles[this._circles.length - 1].updateCollor(0x000000);
  }

  _drawBalls(iter, x, y) {
    for (let i = 0; i < iter; i++) {
      this._cretatecircle(x, y, 0xff0000);

      y += 60;
    }
  }

  _onLoadComplete() {
    this._drawHoles(0x222222);
    this._billiardTriAngle();
    this._mouseEvent();
  }

  _drawHoles(collor) {
    this._holles = [];

    for (let i = 0; i < 6; i++) {
      const balls = new Circle(collor);
      balls.beginFill(0xffffff);

      if (getBiliardHoll()[i].x === 0.5) {
        console.log(555);
        balls.drawCircle(0, 0, 60);
      } else {
        balls.drawCircle(0, 0, 50);
      }

      balls.closePath();

      balls.endFill();
      this._holles.push(balls);
      this._holles[i].position.x = getBiliardHoll()[i].x * this.renderer.width;
      this._holles[i].position.y = getBiliardHoll()[i].y * this.renderer.height;

      this.stage.addChild(this._holles[i]);
    }
  }
  _cretatecircle(x = 0, y = 0, collor) {
    this.graphic = new Circle(collor);

    this.graphic.x = x;
    this.graphic.y = y;
    //  this.graphic.beginFill(getRandomColor());

    this._circles.push(this.graphic);

    for (let i = 0; i < this._circles.length; i++) {
      this._circles[i].velocity = {
        x: 0,
        y: 0,
      };
    }
    this.stage.addChild(this.graphic);
  }

  _mouseEvent() {
    this.graphic.interactive = true;

    this.graphic.on('pointerdown', this._onCirclePointerDown, this);
    this.graphic.on('pointerup', this._onCirclePointerUp, this);
    this.graphic.on('pointerupoutside', this._onCirclePointerSide, this);
  }

  _drawPathLine() {
    this.pathLine = new PIXI.Graphics();
    this.pathLine.lineStyle(2, 0xff0000);
    this.pathLine.moveTo(this.graphic.x, this.graphic.y);
    this.pathLine.lineTo(this.mouseUpPos.x, this.mouseUpPos.y);
    this.stage.addChild(this.pathLine);
  }

  _onCirclePointerDown() {
    this.graphic.on('pointermove', this._onCirclePointerMove, this);

    this.mouseDownPos.x = this.graphic.x;
    this.mouseDownPos.y = this.graphic.y;
    this.mouseUpPos.x = this.graphic.x;
    this.mouseUpPos.y = this.graphic.y;

    this._drawPathLine();
  }

  _colculateVelocity() {
    this._circles[this._circles.length -1].velocity.x = (this.mouseDownPos.x - this.mouseUpPos.x) / 20;
    this._circles[this._circles.length -1].velocity.y = (this.mouseDownPos.y - this.mouseUpPos.y) / 20;
  }

  _onCirclePointerUp(e) {
    this.graphic.off('pointermove', this._onCirclePointerMove, this);
    this.pathLine.clear();
  }
  _onCirclePointerSide() {
    this.graphic.off('pointermove', this._onCirclePointerMove, this);
    this.pathLine.clear();
    this._colculateVelocity();
  }

  _circleMove() {
    this._circles.forEach((circle) => {
        // console.log(circle)
        //if(circle){
      circle.x += circle.velocity.x;
      circle.y += circle.velocity.y;
      const distance = this._checkCollisionVel(circle);

      if (circle.velocity.x > 0) {
        circle.velocity.x -= Math.abs(circle.velocity.x) / distance / 10;
      } else if (circle.velocity.x < 0) {
        circle.velocity.x += Math.abs(circle.velocity.x) / distance / 10;
      }
    //   if (circle.velocity.x < 0.01 && circle.velocity.x > -0.01) {
    //     circle.velocity.x = 0;
    //   }
      if (circle.velocity.y > 0) {
        circle.velocity.y -= Math.abs(circle.velocity.y) / distance / 10;
      } else if (circle.velocity.y < 0) {
        circle.velocity.y += Math.abs(circle.velocity.y) / distance / 10;
      }
    //   if (circle.velocity.y < 0.01 && circle.velocity.y > -0.01) {
    //     circle.velocity.y = 0;
    //   }
   // }
    });
  }

  _onCirclePointerMove(e) {
    this.mouseUpPos.x = e.data.global.x;
    this.mouseUpPos.y = e.data.global.y;

    this.pathLine.clear();
    this._drawPathLine();
  }

  _dieleteCircle(circle, index) {
    this._circles.splice(index, 1);
    circle.destroy();
  }

  _checkWorldBounds() {
    this._circles.forEach((circle) => {
      if (circle.x > window.innerWidth - circle.width / 2) {
        circle.velocity.x = -Math.abs(circle.velocity.x);
      } else if (circle.x < circle.width / 2) {
        circle.velocity.x = Math.abs(circle.velocity.x);
      } else if (circle.position.y > window.innerHeight - circle.width / 2) {
        circle.velocity.y = -Math.abs(circle.velocity.y);
      } else if (circle.y < circle.width / 2) {
        circle.velocity.y = Math.abs(circle.velocity.y);
      }
    });
  }

  _checkCirclesCollision() {
    for (let c = 0; c < this._circles.length; c++) {
      const circle1 = this._circles[c];
      let isDestroy = false
      this._checkWorldBounds();

      for (let h = 0; h < this._holles.length; h++) {
      const hole = this._holles[h];

        const hollDist = this._checkCollision(circle1, hole);
        if (hole.width / 2 >= hollDist) {
          this._dieleteCircle(circle1, h);
          isDestroy = true
          break
        }
      }

      if(isDestroy) break
      
      this._circles.forEach((circle2) => {
        const distance1 = this._checkCollision(circle1, circle2);
        if (circle1.width / 2 + circle2.width / 2 >= distance1) {
          this._resolveCollision(circle1, circle2);
        }
      });
    }
  }

  _checkCollision(circle1, circle2) {
    return Math.sqrt(
      Math.pow(circle2.position.x - circle1.position.x, 2) + Math.pow(circle2.position.y - circle1.position.y, 2)
    );
  }
  _checkCollisionVel(circle) {
    // console.warn(circle.velocity.y);
    return Math.sqrt(Math.pow(circle.velocity.x, 2) + Math.pow(circle.velocity.y, 2));
  }

  _resolveCollision(circle1, circle2) {
    const xVelocityDiff = circle1.velocity.x - circle2.velocity.x;
    const yVelocityDiff = circle1.velocity.y - circle2.velocity.y;
    const distance = this._checkCollision(circle1, circle2);
    const xDist = circle2.position.x - circle1.position.x;
    const yDist = circle2.position.y - circle1.position.y;
    let VCollisionNorm = { x: xDist / distance, y: yDist / distance };
    let speed = xVelocityDiff * VCollisionNorm.x + yVelocityDiff * VCollisionNorm.y;
    if (speed >= 0) {
      circle1.velocity.x -= 0.9 * speed * VCollisionNorm.x;
      circle1.velocity.y -= 0.9 * speed * VCollisionNorm.y;

      circle2.velocity.x = 0.9 * speed * VCollisionNorm.x;
      circle2.velocity.y = 0.9 * speed * VCollisionNorm.y;
    }
  }

  _animate() {
    this._circleMove();
    this._checkCirclesCollision();
  }
}
