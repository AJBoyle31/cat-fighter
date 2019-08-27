import {Cat} from '../sprites/Cat.js';
import {Baddie} from '../sprites/Baddie.js';
import {Level} from './Level.js';

class CatFighter extends Level {
    constructor(){
        super({
            key: 'CatFighter'
        });
    }
    
    preload(){
        this.load.image('tiles', 'src/assets/nature-paltformer-tileset-16x16.png');
        this.load.tilemapTiledJSON('testmap', 'src/assets/test-level-1.json');
    }
    
    create(){
        
        this.map = this.make.tilemap({key: 'testmap'});
        this.tileset = this.map.addTilesetImage('nature-paltformer-tileset-16x16', 'tiles');
        
        this.sky = this.map.createStaticLayer('Sky', this.tileset);
        this.ledgeBases = this.map.createStaticLayer('LedgeBases', this.tileset);
        this.platforms = this.map.createDynamicLayer('Platforms', this.tileset);

        this.map.setCollision([ 0,1,2 ]);
        
        this.cat = new Cat({key: 'cat', scene: this, x: 100, y: 100});
        
        this.baddie = new Baddie({key: 'baddie', scene: this, x: 200, y: 400});

        this.energy = this.add.group({
            runChildUpdate: true
            
        });
   
        this.initScene(this.cat, this.baddie, this.energy);
    
    }
    
    update(){
    
        this.cat.update();
        this.baddie.update();


        
        
    }

    

}

export default CatFighter;