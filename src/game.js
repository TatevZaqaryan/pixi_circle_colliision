import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })
        document.body.appendChild(this.view)
        
        this.loader.add([
            { name: 'bunny1', url: 'assets/bunny1.png' },
            { name: 'bunny2', url: 'assets/bunny2.png' },
            { name: 'bunny3', url: 'assets/bunny3.png' },
        ])
        this.container=new PIXI.Container();
        this.stage.addChild(this.container)

        const texture=PIXI.Texture.from('assets/bunny1.png');
         this.bunnies=[];
        for (let i = 0; i < 9; i++) {


           const bunny=new PIXI.Sprite(texture)
            bunny.anchor.set(0.5);
            bunny.x=(i%3)*40;
            bunny.y=Math.floor(i/3)*40;
            this.bunnies.push(bunny);
            this.container.addChild(bunny);       

        }

        this.container.x=this.screen.width/2
        this.container.y=this.screen.height/2

        this.container.pivot.x=this.container.width/2;
        this.container.pivot.y=this.container.height/2;

        this.ticker.add(this._animate, this);
         this.ticker.start();
    }
         _animate(){
             this.container.rotation+=0.01;
             for (let i = 0; i < this.bunnies.length; i++) {
                 
                 this.bunnies[i].rotation-=0.01;
             }
             

         }
    //     this.loader.onComplete.add(this._onLoadComplete, this)
    //     this.loader.onLoad.add(this._onLoad, this)
    //     this.loader.onProgress.add(this._onLoadProgress, this)
    //     this.loader.onError.add(this._onLoadError, this)
    //     this.loader.load()
    // }

    // _onLoad(loader, resource) {
    //     // 
    // }

    // _onLoadProgress(loader, resource) {
    //     console.warn(loader )
    //     console.log(`progress  |  ${loader.progress} | ${resource.name}`);
    // }

    // _onLoadError(error, loader, resource) {
    //     throw new Error(error)
    // }

    // _onLoadComplete(loader, resources) {
    //     this.container=new PIXI.Container();
    //     this.stage.addChild(this.container);

    //     const texture1 = PIXI.Texture.from('bunny1')
    //     const texture2 = PIXI.Texture.from('bunny2')
    //     const texture3 = PIXI.Texture.from('bunny3')

    //     this.bunny1 = new PIXI.Sprite(texture1);
    //     this.bunny1.y=100;
    //     this.bunny2 = new PIXI.Sprite(texture2);
    //     this.bunny2.x=100;
    //     this.bunny2.y=100;

    //     this.bunny3 = new PIXI.Sprite(texture3);
    //     this.bunny3


    //     // this.bunny.x = this.renderer.width * 0.5;
    //     // this.bunny.y = this.renderer.height * 0.5;
    //     // this.bunny.anchor.set (0.5) ;
    //     // this.bunny.anchor.y = 0.5;

    //     this.ticker.add(this._animate, this);
    //     this.ticker.start();

    //     this.container.addChild(this.bunny1)
    //     this.container.addChild(this.bunny2)
    //     this.container.addChild(this.bunny3)
    //     this.bunny3.anchor.set(0.5)
    //     this.delta=0;

    // }

    // _animate() {
    //     this.delta+=0.1;
    //     this.bunny1.y=100+Math.sin(this.delta)*10;
    //     this.bunny2.x=100+Math.sin(this.delta)*10;
    //     this.bunny3.scale=new PIXI.Point(0.5, 0.5)
        // this.container=Math.sin(this.delta)*10;
        // console.log(this.renderer);
        // this.bunny1.rotation += 0.1
        // this.renderer.render(this.stage)
    //}
}