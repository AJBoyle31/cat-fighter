import {Cat} from '../sprites/Cat.js';
import {Baddie} from '../sprites/Baddie.js';

class CatFighter extends Phaser.Scene {
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
        
        var graphics = this.add.graphics();
        
        this.cat = new Cat({key: 'cat', scene: this, x: 100, y: 400, graphics: graphics});

        this.baddie = new Baddie({key: 'baddie', scene: this, x: 200, y: 400})
        
        this.catFireballs = this.add.group();
        
        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.baddie, this.platforms);
        this.physics.add.overlap(this.cat, this.baddie, this.attack, null, this);
    }
    
    update(){
    
        this.cat.update();
        this.baddie.update();
        
    }

    

}

export default CatFighter;