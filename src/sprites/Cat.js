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
        this.speed = 115;
        this.jumpSpeed = -330;
        this.timerShootDelay = 15;
        this.timerShootTick = this.timerShootDelay - 1;
        this.setScale(2);
        this.body.setCollideWorldBounds(true);

        this.body.setSize(10, 26);
        //this.body.setOffset(-1, 9);
        //this.attackArea = attackB;

        //player animation checkers
        this.movement = true;
        this.jumping = false;
        this.attacking = false;

        //KEYBOARD KEYS DESIGNATOR
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyG = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyV = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        
    }


    update(time, delta){

        if (!this.alive){
            return;
        }
        
        //Cat facing direction and physics body
        if (this.flipX){
            this.body.setOffset(28, 28);
        } else {
            this.body.setOffset(26, 28);
        }

        //ANIMATIONS CONTROLLER
        if (this.movement){
            if (!this.body.blocked.down){
                this.jumping = true;
                this.startNewAnim('Jump');
            }
            else if (this.body.velocity.x !== 0 && this.body.blocked.down){
                this.jumping = false;
                this.startNewAnim('Walk');
            }
            else if (this.body.velocity.x === 0 && this.body.blocked.down){
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
        if (this.cursors.up.isDown && !this.attacking && this.body.blocked.down){
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
            //TWO SIDE SHOT
            if (Phaser.Input.Keyboard.JustDown(this.keyA)){
                this.attackMove('Twoside');
                this.alreadyShot = false;
            }
        }

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

        //POWER SHOT UP 
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

        //JUMP SHOT FRONT
        if (this.anims.getCurrentKey() == 'catJumpShotFront' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catRegShotFront');
            }
        }

        //TWO SIDE SHOT
        if (this.anims.getCurrentKey() == 'catTwoside' && this.anims.getProgress() > 0.65){
            if (!this.alreadyShot){
                this.alreadyShot = true;
                this.shootEnergy('catTwosideShot');
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
            var energyShot;
            if (this.flipX){
                energyShot = new SuperEnergyShot(this.scene, this.body.x - 40, this.body.y + 28, true);
            } else {
                energyShot = new SuperEnergyShot(this.scene, this.body.x + 40, this.body.y + 28, false);
            }

        } else if (key == 'catPowerShotFront'){
            if (this.flipX){
                energyShot = new PowerEnergyShot(this.scene, this.body.x - 20, this.body.y + 28, true);
            } else {
                energyShot = new PowerEnergyShot(this.scene, this.body.x + 40, this.body.y + 28, false);
            }

        } else if (key == 'catRegShotFront'){
            if (this.flipX){
                energyShot = new RegularEnergyShot(this.scene, this.body.x - 30, this.body.y + 28, true);
            } else {
                energyShot = new RegularEnergyShot(this.scene, this.body.x + 50, this.body.y + 28, false);
            }
        }

        else if (key == 'catRegShotUp'){
            if (this.flipX){
                energyShot = new RegularShotUp(this.scene, this.body.x , this.body.y + 20, true);
            } else {
                energyShot = new RegularShotUp(this.scene, this.body.x + 30, this.body.y + 20, false);
            }

        } else if (key == 'catSuperShotAir'){
            if (this.flipX){
                energyShot = new PowerShotUp(this.scene, this.body.x - 12, this.body.y + 7, true);
            } else {
                energyShot = new PowerShotUp(this.scene, this.body.x + 30, this.body.y + 12, false);
            }
        } else if (key == 'catRegShotDown'){
            if (this.flipX){
                energyShot = new RegularShotDown(this.scene, this.body.x - 20, this.body.y + 35, true);
            } else {
                energyShot = new RegularShotDown(this.scene, this.body.x + 45, this.body.y + 35, false);
            }
        } else if (key == 'catTwosideShot'){
            var energyShotLeft = new RegularEnergyShot(this.scene, this.body.x - 20, this.body.y + 28, true);
            var energyShotRight = new RegularEnergyShot(this.scene, this.body.x + 35, this.body.y + 28, false);
            this.scene.energy.addMultiple([energyShotLeft, energyShotRight]);
        }

        if (key !== 'catTwosideShot'){
            this.scene.energy.add(energyShot);
        }
        
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
            case 'Twoside':
                this.play('catTwoside', true);
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

}

