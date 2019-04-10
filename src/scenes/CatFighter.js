import {Cat} from '../sprites/cat.js';

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

        this.baddie = this.physics.add.sprite(200, 400, 'baddie');
        this.baddie.setCollideWorldBounds(true);
        this.baddie.setVelocityX(100);
        this.baddie.anims.play('baddieRight', true);
        this.baddie.setBounce(1,0);

        this.catFireballs = this.add.group();
        
        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.baddie, this.platforms);
        
    }
    
    update(){
    
        this.cat.update();

        if(this.baddie.body.deltaX() > 1){
            this.baddie.anims.play('baddieRight', true);
        } else {
            this.baddie.anims.play('baddieLeft', true);
        }
        
        
    }

}

export default CatFighter;