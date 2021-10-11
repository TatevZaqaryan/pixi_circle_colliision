import * as PIXI from 'pixi.js'
import { Velocity } from 'planck-js';
import { Circle } from './circle.js';
import { getRandomInRange, getRandomColor } from "./utils.js";

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })
        document.body.appendChild(this.view)

        // this.loader.add([
        //     { name: 'bunny1', url: 'assets/bunny1.png' },
        //     { name: 'bunny2', url: 'assets/bunny2.png' },
        //     { name: 'bunny3', url: 'assets/bunny3.png' },
        // ])
        this.bulean = false;
        this.time = 0;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.mouseDownPos = {
            x: 0,
            y: 0,
            date: new Date(),
        }
        this.mouseUpPos = {
            x: 0,
            y: 0,
            date: new Date(),
        }

        this.loader.onComplete.add(this._onLoadComplete, this);
        this.loader.load();
    
        this.ticker.add(this._animate, this);
        this.ticker.start();


       


    }

    _onLoadComplete(){
        this._cretatecircle();
        this._mouseEvent();
    }
_cretatecircle(){
    this.graphic = new Circle();
    this.graphic.x = this.renderer.width / 2,
    this.graphic.y = this.renderer.height / 2
    this.graphic.beginFill(getRandomColor());
    this.stage.addChild(this.graphic);

}
_mouseEvent(){
    this.graphic.interactive = true;

    this.graphic.on('pointerdown', this._onCirclePointerDown, this);
    this.graphic.on("pointerup", this._onCirclePointerUp, this);
    this.graphic.on("pointerupoutside", this._onCirclePointerSide, this);
}

    _drawPathLine() {
        this.pathLine = new PIXI.Graphics();
        this.pathLine.lineStyle(2, 0xff0000);
        this.pathLine.moveTo(this.graphic.x, this.graphic.y);
        this.pathLine.lineTo(this.mouseUpPos.x, this.mouseUpPos.y)
        this.stage.addChild(this.pathLine);
    }

    _onCirclePointerDown() {
        this.graphic.on("pointermove", this. _onCirclePointerMove, this);

            this.mouseDownPos.x = this.graphic.x;
            this.mouseDownPos.y = this.graphic.y;
            this.mouseUpPos.x=this.graphic.x;
            this.mouseUpPos.y=this.graphic.y;

            this._drawPathLine()
    }

    _colculateVelocity() {
        this.velocity.x = (this.mouseDownPos.x - this.mouseUpPos.x)/40
        this.velocity.y = (this.mouseDownPos.y - this.mouseUpPos.y)/40 
    }


    _onCirclePointerUp(e) {
        this.graphic.off("pointermove", this. _onCirclePointerMove, this);
        this.pathLine.clear();

    }
    _onCirclePointerSide(){
        this.graphic.off("pointermove", this. _onCirclePointerMove, this);
        this.pathLine.clear();
        this._colculateVelocity()
       
        console.log(this.velocity.x)
   
    }
_circleMove(){
    this.graphic.x+=this.velocity.x;
    this.graphic.y+=this.velocity.y;

    if (this.velocity.x>0) {
        this.velocity.x-=0.03;
    }
    else if(this.velocity.x<0){
        this.velocity.x+=0.03;

    }
    if (this.velocity.x<0.01 && this.velocity.x>-0.01) {
        this.velocity.x=0;
    }
    if (this.velocity.y>0) {
        this.velocity.y-=0.03;
    }
    else if(this.velocity.y<0){
        this.velocity.y+=0.03;

    }
    if (this.velocity.y<0.01 && this.velocity.y>-0.01) {
        this.velocity.y=0;
    }
}
    _onCirclePointerMove(e) {
        console.log('move')
        this.mouseUpPos.x = e.data.global.x;
        this.mouseUpPos.y = e.data.global.y;
        
            this.pathLine.clear();
            this._drawPathLine()
        
    }
    _checkWorldBounds() {
            
            if(this.graphic.x>window.innerWidth-this.graphic.width/2){
                this.velocity.x=-Math.abs( this.velocity.x)
                }
        
                else if(this.graphic.x<this.graphic.width/2){
                    this.velocity.x=Math.abs( this.velocity.x)
                }
                
                else if(this.graphic.position.y>window.innerHeight-this.graphic.width/2){
                    this.velocity.y=-Math.abs( this.velocity.y)
                    
                }
                else if(this.graphic.y<this.graphic.width/2){
                    this.velocity.y=Math.abs( this.velocity.y)
                }
        
        
    }

_animate(){
this._circleMove()
this._checkWorldBounds() 
}

    


}