export class EnergyShots extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);
        this.animation = key;
        this.setAllowGravity = false;
        scene.add.existing(this);
        
        this.speed = Phaser.Math.GetSpeed(300, 1);
        this.anims.play(key, true);
        
    }
    update(time, delta){
        
    } 
}

export class RegularEnergyShot extends EnergyShots {
    constructor(scene, x, y, key){
        super(scene, x, y, 'catRegShotFront');
        
    }
}