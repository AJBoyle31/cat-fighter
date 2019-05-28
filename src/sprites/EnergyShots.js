export class EnergyShots extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);
        //this.animation = key;
        
        //scene.add.existing(this);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.speed = Phaser.Math.GetSpeed(300, 1);

        this.body.velocity.x = 200;
        this.body.allowGravity = false;
        //this.anims.play(key, true);
        
    }
    update(time, delta){
        
    } 
}

export class RegularEnergyShot extends EnergyShots {
    constructor(scene, x, y){
        super(scene, x, y, 'catRegShotFront');
        this.body.setSize(20, 20);
        this.anims.play('catRegShotFront');
    }

    hit(){
        //this.setTexture('catRegShotFrontHit');
        this.anims.play('catRegShotFrontHit', true);
        this.on('animationcomplete', () => {
            this.destroy();
        })
    }
}

export class SuperEnergyShot extends EnergyShots {
    constructor(scene, x, y){
        super(scene, x, y, 'catSuperShot');
        this.body.setSize(20, 40);
        this.body.setOffset(25, 12);
        this.anims.play('catSuperShot');
    }

    hit(){
        //this.setTexture('catRegShotFrontHit');
        this.anims.play('catSuperShotHit', true);
        this.on('animationcomplete', () => {
            this.destroy();
        })
    }
    
}