export class EnergyShots extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);
        //this.animation = key;

        //scene.add.existing(this);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.speed = Phaser.Math.GetSpeed(300, 1);


        this.body.allowGravity = false;
        //this.anims.play(key, true);

    }
    update(time, delta){

    }
}

//REGULAR ENERGY SHOT
export class RegularEnergyShot extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catRegShotFront', direction);
        this.speed = 200;
        if (direction){
            this.body.velocity.x = -this.speed;
            this.flipX = true;
        } else {
            this.body.velocity.x = this.speed;
        }
        this.body.setSize(20, 20);
        this.anims.play('catRegShotFront');
    }

    hit(){
        //this.setTexture('catRegShotFrontHit');
        this.anims.play('catRegShotFrontHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }
}

//POWER ENERGY SHOT
export class PowerEnergyShot extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catPowerShotFront', direction);
        this.speed = 200;
        if (direction){
            this.body.velocity.x = -this.speed;
            this.flipX = true;
        } else {
            this.body.velocity.x = this.speed;
        }
        this.body.setSize(20, 20);
        this.anims.play('catPowerShotFront');
    }

    hit(){
        this.anims.play('catRegShotFrontHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }
}

//SUPER ENERGY SHOT
export class SuperEnergyShot extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catSuperShot', direction);
        this.speed = 200;
        if (direction){
            this.body.velocity.x = -this.speed;
            this.flipX = true;
        } else {
            this.body.velocity.x = this.speed;
        }

        this.body.setSize(20, 40);
        this.body.setOffset(25, 12);
        this.anims.play('catSuperShot', true);
    }

    hit(){
        //this.setTexture('catRegShotFrontHit');
        this.anims.play('catSuperShotHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }

}

//REGULAR SHOT UP
export class RegularShotUp extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catRegShotUp', direction);
        this.speed = 150;
        if (direction){
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = -this.speed;
            this.flipX = true;
            this.body.setSize(10,10);
            this.body.setOffset(7,7);
        } else {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = -this.speed;
            this.body.setSize(10,10);
            this.body.setOffset(15,7);
        }
        
        this.anims.play('catRegShotUp', true);
    }

    hit(){
        this.anims.play('catRegShotUpHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }
}

//POWER SHOT UP
export class PowerShotUp extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catSuperShotUp', direction);
        this.speed = 200;
        if (direction){
            this.flipX = true;
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = -this.speed;
            this.body.setSize(20,20); //NEED TO ADJUST
            this.body.setOffset(20,20); //NEED TO ADJUST
        } else {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = -this.speed;
            this.body.setSize(20,20); //NEED TO ADJUST
            this.body.setOffset(20,20); //NEED TO ADJUST
        }
        
        this.body.angle = -45;
        this.anims.play('catSuperShotUp', true);
    }
    hit(){
        this.anims.play('catSuperShotUpHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }
}

//REGULAR SHOT DOWN - DURING JUMP
export class RegularShotDown extends EnergyShots {
    constructor(scene, x, y, direction){
        super(scene, x, y, 'catRegShotDown', direction);
        this.speed = 200;
        if (direction){
            this.body.veloxity.x = -this.speed;
            this.body.velocity.y = this.speed;
        } else {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = this.speed;
        }
        this.body.setSize(20,20); //NEED TO ADJUST, BOX NEEDS TO BE SMALLER
        this.body.setOffset(20,20); //NEED TO ADJUST, BOX NEEDS TO BE SMALLER
        this.angle = 45; //NEED TO CHECK
        this.anims.play('catRegShotDown', true);
    }

    hit(){
        this.anims.play('catRegShotDownHit', true);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }
}

//