import {Entity} from './Entity.js';
import {EnergyShots} from './EnergyShots.js';

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
        this.setScale(2);
        this.body.setCollideWorldBounds(true);
        
        this.body.setSize(13, 26);
        //this.body.setOffset(-1, 9);
        //this.attackArea = attackB;
        
        //player animation checkers
        this.movement = true;
        this.jumping = false;
        this.attacking = false;
        
        //controls
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
        
        //Animations Controller
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
        
        if (this.cursors.up.isDown && !this.attacking && this.body.touching.down){
            this.jump();    
        }
        
        if (this.keyQ.isDown){
            this.attackMove('Powershot');
        }
        if (this.keyW.isDown){
            this.attackMove('Fastshot');
        }
        if (this.keyE.isDown){
            this.attackMove('Uppercut');
        }
        if (this.keyA.isDown){
            this.attackMove('Roundkick');
        }
        if (this.keyS.isDown){
            this.jumpAttackMove('JumpShotDown');
        }
        if (this.keyD.isDown){
            this.jumpAttackMove('JumpShotFront');
        }
        if (this.keyZ.isDown){
            this.attackMove('SuperChargeShot');
        }
        if (this.keyX.isDown){
            this.attackMove('PowerShotAir');
        }
        if (this.keyC.isDown){
            this.attackMove('FastShotAir');
        }
        if (this.keySpace.isDown){
            var energyShot = new EnergyShots(this.scene, this.body.x + 15, this.body.y - 15, 'catSuperShotFront');
            this.scene.energy.add(energyShot);
        }
        
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
    

}

/*
class CatFireball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'catFireball');
        this.body.setVelocityX(200);
    }    
}
*/