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
        this.load.image('tiles', 'src/assets/tileset-16x16.png');
        this.load.tilemapTiledJSON('testmap', 'src/assets/level-1.json');
    }
    
    create(){
        
        this.map = this.make.tilemap({key: 'testmap'});
        this.tileset = this.map.addTilesetImage('tileset-16x16', 'tiles');
        
        this.sky = this.map.createStaticLayer('Background', this.tileset);
        this.ledgeBases = this.map.createStaticLayer('Midground', this.tileset);
        this.enemyBoundry = this.map.createStaticLayer('EnemyBoundry', this.tileset);
        this.platforms = this.map.createStaticLayer('Foreground', this.tileset);
        

        this.platforms.setCollision([ 0,1,2,42 ]);
        this.enemyBoundry.setCollision([61]);

        
               
        //this.cat = new Cat({key: 'cat', scene: this, x: 100, y: 100});

        //this.potion = this.add.sprite(300, 300, 'potionsgems', 'greenPotion');

        

        this.energy = this.add.group({
            runChildUpdate: true
        });

        //empty array for baddies
        this.enemies = [];

        //empty array for potions
        this.potions = [];

        this.createFromObjects(this.map, 'PlayerSpawnPoint');

        //add baddies
        this.createFromObjects(this.map, 'EnemySpawnPoints');
        
        //add potions
        this.createFromObjects(this.map, 'Potions');
        
        this.initScene(this.cat, this.enemies, this.energy, this.potions);
    
    }
    
    update(){
    
        this.cat.update();
        
        
    }

    

    

}

export default CatFighter;