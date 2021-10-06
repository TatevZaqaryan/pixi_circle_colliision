import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3,
            resolution: window.devicePixelRatio,
            autoDensity:true,
        });


        document.body.appendChild(this.view)
        // const render= new PIXI.Renderer({
        //     view:canvas,
        //     width:window.innerWidth,
        //     height:window.innerHeight,
        // });

        // window.addEventListener('resize', (event) => {
        //     console.warn(this.resize);
        //     console.warn('res');
        // });

        window.addEventListener('resize', this._onResize.bind(this));

        // console.warn(window);
        // console.warn('mta');
        // window.addEventListener('optimizedResize', this.resize.bind(this))

        
        const texture=PIXI.Texture.from('assets/bunny.png');
        const img=new PIXI.Sprite(texture);

        img.x=this.renderer.width/2;
        img.y=this.renderer.height/2;
        img.anchor.x=0.5;
        img.anchor.y=0.5;
         
        this.stage.addChild(img);
        this.ticker.start();
         this.ticker.add(()=>{
             img.x=this.renderer.screen.width/2;
             img.y=this.renderer.screen.height/2;
             img.rotation+=0.04;
             this.render(this.stage)
         })

        // const loader = new PIXI.Loader()
        // loader.add('bunny', 'C).load((loader, resources) => {
        //     const bunny = new PIXI.Sprite(resources.bunny.texture);


        //     bunny.x = this.renderer.width * 0.5;
        //     bunny.y = this.renderer.height * 0.5;

        //     bunny.anchor.x = 0.5;
        //     bunny.anchor.y = 0.5;


        //     this.stage.addChild(bunny);

        //     this.ticker.add(() => {
        //         bunny.rotation += 0.04;
        //     });
        // })
    }

    _onResize() {
        let _w=window.innerWidth;
        let _h=window.innerHeight;
        this.renderer.resize(_w, _h)
    }
}

