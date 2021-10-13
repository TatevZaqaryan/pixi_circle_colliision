import * as PIXI from 'pixi.js'
import * as planck from 'planck-js/dist/planck-with-testbed'
import { getRandomInRange , getRandomColor} from "./utils.js";
export class Circle extends PIXI.Graphics {
    constructor(collor) {
    
        super()
      
        this._buildCircle()
       // this.velocity={x:1,y:1}
        this.tint=collor
    }

    updateCollor(collor){
        this.tint=collor

    }

    _buildCircle() {
       
        
        this.beginFill(0xffffff)      
    
        this.drawCircle(0, 0, getRandomInRange(30,30))
        this.endFill();
      
    }
}