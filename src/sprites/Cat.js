import {Entity} from './Entity.js';
import {RegularEnergyShot, SuperEnergyShot, PowerEnergyShot, RegularShotUp, PowerShotUp, RegularShotDown} from './EnergyShots.js';

export class Cat extends Phaser.GameObjects.Sprite {
    constructor(config){

        //const cat = config.scene.add.sprite(0, 0, 'cat');
        super(config.scene, config.x, config.y, config.key);

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //this.setSize(12, 26);
        //config.scene.add.container(this);
        //config.scene.physics.world.enable(this);
        //config.scene.add.existing(this);

        //Config
        this.alive = true;
        this.speed = 95;
        this.jumpSpeed = -330;
        this.timerShootDelay = 15;
        this.timerShootTick = this.timerShootDelay - 1;
        this.setScale(2);
        this.body.setCollideWorldBounds(true);

        this.body.setSize(13, 26);
        //this.body.setOffset(-1, 9);
        //this.attackArea = attackB;

        //player animation checkers
        this.movement = true;
        this.jumping = false;
        this.attacking = false;

        //KEYBOARD KEYS DESIGNATOR
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyG = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyV = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    update(time, delta){

        if (!this.alive){
            return;
        }

        //Cat facing direction and physics body
        if (this.flipX){
            this.body.setOffset(27, 28);
        } else {
            this.body.setOffset(24, 28);
        }

        //ANIMATIONS CONTROLLER
        if (this.movement){
            if (!this.body.touching.down){
                this.jumping = true;
                this.startNewAnim('Jump');
            }
            else if (this.body.velocity.x !== 0 && this.body.touching.down){
                this.jumping = false;
                this.startNewAnim('Walk');
            }
            else if (this.body.velocity.x === 0 && this.body.touching.down){
                this.jumping = false;
                this.startNewAnim('Idle');
            }

        }

        //Tells me what animation is playing
        //console.log(this.anims.getProgress());

        //CAT MOVEMENT CONTROLS
        if (this.movement){
            if (this.cursors.left.isDown){
                this.body.setVelocityX(-this.speed);
                this.flipX = true;
            }
            else if (this.cursors.right.isDown){
                this.body.setVelocityX(this.speed);
                this.flipX = false;
            }
            else {
                this.idle();
            }
        }

        //JUMP CONTROL
        if (this.cursors.up.isDown && !this.attacking && this.body.touching.down){
            this.jump();
        }

        //ENERGY SHOT CONTROLS
        if (!this.attacking){
            if (Phaser.Input.Keyboard.JustDown(this.keyD)){
                this.attackMove('Powershot');
                this.alreadyShot = false;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyF)){
                this.attackMove('Fastshot');
                this.alreadyShot = false;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyV)){
                this.jumpAttackMove('JumpShotDown');
                this.alreadyShot = false;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyG)){
                this.jumpAttackMove('JumpShotFront');
                this.alreadyShot = false;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyS)){
                this.attackMove('SuperChargeShot');
                this.alreadyShot = false;
            }
            //THIS IS SHOOT UP
            if (Phaser.Input.Keyboard.JustDown(this.keyE)){
                this.attackMove('PowerShotAir');
                this.alreadyShot = false;
            }
            //THIS IS SHOOT UP
            if (Phaser.Input.Keyboard.JustDown(this.keyR)){
                this.attackMove('FastShotAir');
                this.alreadyShot = false;
            }
        }
        /*  FOR TESTING ENERGY SHOTS
        if (this.keySpace.isDown){
            if (this.timerShootTick < this.timerShootDelay){
                this.timerShootTick = this.timerShootTick + 1
            } else {
                var energyShot = new RegularEnergyShot(this.scene, this.body.x + 40, this.body.y + 28);
                this.scene.energy.add(energyShot);
                energyShot.body.velocity.x = 200;
                energyShot.body.allowGravity = false;
                this.timerShootTick = 0;

            }
        } else {
            this.timerShootTick = this.timerShootDelay - 1;
        }
        */

        /*
        //catFlyingkick forward motion
        if (this.anims.getCurrentKey() == 'catFlyingkick' && this.anims.getProgress() > 0.5){
            this.body.setVelocityX(this.flipX ? -this.speed : this.speed);
        }

        //catUppercut jump
        if (this.anims.getCurrentKey() == 'catUppercut' && this.anims.getProgress() > 0.4 && this.body.touching.down){
            this.body.setVelocityY(-140);
            //this.anims.pause();
        }

        //catSpin forward motion
        if (this.anims.getCurrentKey() == 'catSpin' && this.anims.getProgress() > 0.3){
            this.body.setVelocityX(this.flipX ? -this.speed : this.speed);
        }
        if (this.anims.getCurrentKey() == 'catSpin' && this.anims.getProgress() > 0.85){
            this.body.setVelocityX(0);
        }
        */

        //REGULAR SHOT ENERGYSHOT CONTROLLER
        if (this.anims.getCurrentKey() == 'catFastshot' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catRegShotFront');
            }
        }

        //POWER SHOT ENERGYSHOT CONTROLLER
        if (this.anims.getCurrentKey() == 'catPowershot' && this.anims.getProgress() > 0.75){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catPowerShotFront');
            }
        }

        //SUPER SHOT ENERGYSHOT CONTROLLER
        if (this.anims.getCurrentKey() == 'catSuperChargeShot' && this.anims.getProgress() > 0.57){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catSuperShot');
            }
        }

        //REGULAR SHOT AIR
        if (this.anims.getCurrentKey() == 'catFastShotAir' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catRegShotUp');
            }
        }

        //POWER SHOT UP (need to adjust progress)
        if (this.anims.getCurrentKey() == 'catPowerShotAir' && this.anims.getProgress() > 0.75){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catSuperShotAir');
            }
        }

        //JUMP SHOT FORWARD (need to adjust progress)
        if (this.anims.getCurrentKey() == 'catFastShotAir' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catRegShotFront');
            }
        }

        //JUMP SHOT DOWN
        if (this.anims.getCurrentKey() == 'catJumpShotDown' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catRegShotDown');
            }
        }



    }
    //END UPDATE

    idle(){
        this.body.setVelocityX(0);
    }

    jump(){
        this.body.setVelocityY(this.jumpSpeed);
    }

    attackMove(key){
        if(!this.attacking && !this.jumping){
            this.body.setVelocityX(0);
            this.movement = false;
            this.attacking = true;
            this.idle();
            this.startNewAnim(key);
        } else {
            return;
        }

    }

    jumpAttackMove(key){
        if(this.jumping){
            this.attacking = true;
            this.movement = false;
            this.startNewAnim(key);
        } else {
            return;
        }

    }

    //ENERGY SHOT CONTROLLER
    shootEnergy(key){

        if (key == 'catSuperShot'){
            if (this.flipX){
                var energyShot = new SuperEnergyShot(this.scene, this.body.x - 40, this.body.y + 28, true);
            } else {
                var energyShot = new SuperEnergyShot(this.scene, this.body.x + 40, this.body.y + 28, false);
            }

        } else if (key == 'catPowerShotFront'){
            if (this.flipX){
                var energyShot = new PowerEnergyShot(this.scene, this.body.x - 40, this.body.y + 28, true);
            } else {
                var energyShot = new PowerEnergyShot(this.scene, this.body.x + 40, this.body.y + 28, false);
            }

        } else if (key == 'catRegShotFront'){
            if (this.flipX){
                var energyShot = new RegularEnergyShot(this.scene, this.body.x - 50, this.body.y + 28, true);
            } else {
                var energyShot = new RegularEnergyShot(this.scene, this.body.x + 50, this.body.y + 28, false);
            }
        }

        else if (key == 'catRegShotUp'){
            if (this.flipX){
                var energyShot = new RegularShotUp(this.scene, this.body.x , this.body.y + 20, true);
            } else {
                var energyShot = new RegularShotUp(this.scene, this.body.x + 30, this.body.y + 20, false);
            }

        } else if (key == 'catSuperShotAir'){
            if (this.flipX){
                var energyShot = new PowerShotUp(this.scene, this.body.x - 30, this.body.y + 12, true);
            } else {
                var energyShot = new PowerShotUp(this.scene, this.body.x + 30, this.body.y + 12, false);
            }
        } else if (key == 'catRegShotDown'){
            if (this.flipX){
                var energyShot = new RegularShotDown(this.scene, this.body.x - 30, this.body.y + 12, true);
            } else {
                var energyShot = new RegularShotDown(this.scene, this.body.x + 30, this.body.y + 12, false);
            }
        }

        this.scene.energy.add(energyShot);
        this.timerShootTick = 0;

    }

    //ANIMATION CONTROLLER
    startNewAnim(key){

        switch(key){
            case 'Idle':
                this.play('catIdle', true);
                break;
            case 'Walk':
                this.play('catWalk', true);
                break;
            case 'Jump':
                this.play('catAir', true);
                break;
            case 'Powershot':
                this.play('catPowershot', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Fastshot':
                this.play('catFastshot', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Flyingkick':
                this.play('catFlyingkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Spin':
                this.play('catSpin', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Uppercut':
                this.play('catUppercut', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Combo':
                this.play('catCombo', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Lowkick':
                this.play('catLowkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Midkick':
                this.play('catMidkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Highkick':
                this.play('catHighkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Downkick':
                this.play('catDownkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Twoside':
                this.play('catTwoside', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Roundkick':
                this.play('catRoundkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Punch':
                this.play('catPunch', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'SuperChargeShot':
                this.play('catSuperChargeShot', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'PowerShotAir':
                this.play('catPowerShotAir', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'FastShotAir':
                this.play('catFastShotAir', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'JumpShotFront':
                if (this.jumping && this.anims.getCurrentKey() !== 'catJumpShotFront'){
                    this.play('catJumpShotFront', true);
                    this.on('animationcomplete-cat' + key, () => {
                        this.movement = true;
                        this.attacking = false;
                    });
                   break;
                } else {
                    break;
                }
            case 'JumpShotDown':
                if (this.jumping && this.anims.getCurrentKey() !== 'catJumpShotDown'){
                    this.play('catJumpShotDown', true);
                    this.on('animationcomplete-cat' + key, () => {
                        this.movement = true;
                        this.attacking = false;
                    });
                    break;
                } else {
                    break;
                }
        }

    }
    //END ANIMATION CONTROLLER

    fireSwitch(){
        this.ableToFire = true;
    }


}

/*
class CatFireball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'catFireball');
        this.body.setVelocityX(200);
    }
}
*/