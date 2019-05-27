export class EnergyShots extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);
        this.animation = key;
        
        //scene.add.existing(this);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.speed = Phaser.Math.GetSpeed(300, 1);

        this.body.velocity.x = 200;
        this.body.allowGravity = false;
        this.anims.play(key, true);
        
    }
    update(time, delta){
        
    } 
}

export class RegularEnergyShot extends EnergyShots {
    constructor(scene, x, y, key){
        super(scene, x, y, 'catRegShotFront');
        this.body.setSize(20, 40);
    }
}

export class SuperEnergyShot extends EnergyShots {
    constructor(scene, x, y, key){
        super(scene, x, y, 'catSuperChargeShot');
        this.body.setSize(10, 10);
    }
}