export class Baddie extends Phaser.GameObjects.Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, config.key);

        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.health = config.health;
        
        this.body.setVelocityX(100);
        this.anims.play('baddieRight', true);
        this.body.setBounce(1,0);

        this.alive = true;
    }

    update(time, delta){
        if (this.alive){
            if(this.body.deltaX() > 1){
                this.anims.play('baddieRight', true);
            } else {
                this.anims.play('baddieLeft', true);
            }
        }
    }

    kill(){
        this.alive = false;
        this.destroy();
    }
}