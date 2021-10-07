import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })
        this.velocity = {x:3,y:3}
        document.body.appendChild(this.view)
        
        this.loader.add([
            { name: 'bunny1', url: 'assets/bunny1.png' },
            { name: 'bunny2', url: 'assets/bunny2.png' },
            { name: 'bunny3', url: 'assets/bunny3.png' },
        ])


    
    this.graphic=new PIXI.Graphics();
    this.graphic.x=Math.random()*this.renderer.width/2;
    this.graphic.y=Math.random()*this.renderer.height/2;
    this.graphic.beginFill(0x0ff0000)
    this.graphic.drawCircle(0, 0, 50)
    this.graphic.endFill();
    this.stage.addChild(this.graphic);

    // this.ticker.add(this._animate, this);
    // this.ticker.start();
   // this.delta=0; 

this.ticker.add(this._animate, this);
    this.ticker.start();
   

    }

    _animate(){
            //  this.delta+=0.5
        this._move()
    }

    _move(){
            
            this.graphic.x+=this.velocity.x;
            this.graphic.y+=this.velocity.y;
            this._checkWorldBounds()
        }
    

    _checkWorldBounds() {
            if(this.graphic.position.x>window.innerWidth-this.graphic.width/2){
                this.velocity.x=-2
            }
    
            if(this.graphic.position.x<this.graphic.width/2){
                this.velocity.x=2
            }
            
            if(this.graphic.position.y>window.innerHeight-this.graphic.width/2){
                this.velocity.y=-2
                
            }
            if(this.graphic.position.y<this.graphic.width/2){
                this.velocity.y=2
            }
    }


}