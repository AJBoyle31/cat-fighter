export class EnergyShots extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, 'catSuperShotFront');
        this.setAllowGravity = false;
        scene.add.existing(this);
        
        this.speed = Phaser.Math.GetSpeed(300, 1);
        this.anims.play('catSuperShotFront', true);
        
    }
    update(time, delta){
        
    } 
}