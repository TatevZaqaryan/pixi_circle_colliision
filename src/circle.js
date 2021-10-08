import * as PIXI from 'pixi.js'
import * as planck from 'planck-js/dist/planck-with-testbed'
import { getRandomInRange , getRandomColor} from "./utils.js";
export class Circle extends PIXI.Graphics {
    constructor() {
        super()
        this._buildCircle()
        this.velocity={x:1,y:1}
        console.warn(planck)
    }

    _buildCircle() {
        this.beginFill(getRandomColor())
        this.drawCircle(0, 0, getRandomInRange(25,50))
        this.endFill();
      
    }
}