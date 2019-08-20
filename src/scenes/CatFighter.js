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
        
    }
    
    create(){
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        
        this.cat = new Cat({key: 'cat', scene: this, x: 100, y: 400});
        
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