import * as PIXI from 'pixi.js'
import { Circle } from './circle.js';
import { getRandomInRange , getRandomColor} from "./utils.js";
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
      
    
   


    this.ticker.add(this._animate, this);
    this.ticker.start();
    
this.circles=[];
 for (let i = 0; i < 15; i++) {
     
    const graphic=new Circle();
     graphic.x=getRandomInRange(graphic.width, this.renderer.width-graphic.width);
     graphic.y=getRandomInRange(graphic.height, this.renderer.height-graphic.height);
     this.circles.push(graphic)
     this.stage.addChild(graphic);
 }


    }
    _animate(){
        this._move()
    }

    _move(){

            for (let i = 0; i < this.circles.length; i++) {
                
                this.circles[i].x+=this.circles[i].velocity.x;
                this.circles[i].y+=this.circles[i].velocity.y;
            }
            this._checkWorldBounds()
            this._checkCirclesCollision()
        }
    

    _checkWorldBounds() {
        for (let i = 0; i < this.circles.length; i++) {
            
            if(this.circles[i].position.x>window.innerWidth-this.circles[i].width/2){
                this.circles[i].velocity.x=-3
                console.log(i)
                }
        
                else if(this.circles[i].position.x<this.circles[i].width/2){
                    this.circles[i].velocity.x=3
                }
                
                else if(this.circles[i].position.y>window.innerHeight-this.circles[i].width/2){
                    this.circles[i].velocity.y=-3
                    
                }
                else if(this.circles[i].position.y<this.circles[i].width/2){
                    this.circles[i].velocity.y=3
                }
        }
        
    }

    _checkCirclesCollision() {
        this.circles.forEach((circle1, index1)=>{
            this.circles.forEach((circle2,index2)=>{
                
            if (index1!==index2) {
              // const distance= this._checkCollision(circle1, circle2)        
             
            if ( this. rectsIntersect(circle1, circle2)) {
                    
              this. _resolveCollision(circle1, circle2)
            }
                
            }
            })
         })
    }  

    _checkCollision(circle1, circle2) {
        return Math.sqrt(Math.pow((circle2.position.x-circle1.position.x), 2)+Math.pow((circle2.position.y-circle1.position.y), 2));
       
    } 
    rectsIntersect(a, b){
        this.aBox=a.getBounds();
        this.bBox=b.getBounds();

        return this.aBox.x+this.aBox.width>this.bBox.x&&this.aBox.x<this.bBox.x+this.bBox.width&&this.aBox.y+this.aBox.height>this.bBox.y&&this.aBox.y<this.bBox.y+this.bBox.height;

    }
 
    _resolveCollision(circle1, circle2) {

            const xVelocityDiff = circle1.velocity.x - circle2.velocity.x;
            const yVelocityDiff = circle1.velocity.y - circle2.velocity.y;
            const distance=this._checkCollision(circle1, circle2)  
            const xDist = circle2.position.x - circle1.position.x;
            const yDist = circle2.position.y - circle1.position.y;
            let VCollisionNorm={x:xDist/distance, y:yDist/distance}
            let speed=xVelocityDiff *VCollisionNorm.x + yVelocityDiff*VCollisionNorm.y ;
            if (speed >=0) {
        
                circle1.velocity.x -= 0.7*speed*VCollisionNorm.x
                circle1.velocity.y -= 0.7*speed*VCollisionNorm.y
        
                circle2.velocity.x =0.7*speed*VCollisionNorm.x
                circle2.velocity.y = 0.7*speed*VCollisionNorm.y
        
                
            }  
        
        }
    


}