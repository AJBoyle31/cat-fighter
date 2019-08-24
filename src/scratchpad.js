/*
//preload
this.anims.create({
    key: 'catFlyingkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'flyingkick', end: 8}),
    frameRate: 7
});

this.anims.create({
    key: 'catSpin',
    frames: this.anims.generateFrameNames('cat', {prefix: 'spin', start: 11, end: 20}),
    frameRate: 7
});

this.anims.create({
    key: 'catUppercut',
    frames: this.anims.generateFrameNames('cat', {prefix: 'uppercut', start: 11, end: 23}),
    frameRate: 10
});

this.anims.create({
    key: 'catCombo',
    frames: this.anims.generateFrameNames('cat', {prefix: 'combo', start: 11, end: 20}),
    frameRate: 7
});

this.anims.create({
    key: 'catLowkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'lowkick', end: 6}),
    frameRate: 7
});

this.anims.create({
    key: 'catMidkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'midkick', end: 6}),
    frameRate: 7
});

this.anims.create({
    key: 'catHighkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'highkick', end: 6}),
    frameRate: 7
});

this.anims.create({
    key: 'catDownkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'downkick', end: 8}),
    frameRate: 7
});

this.anims.create({
    key: 'catRoundkick',
    frames: this.anims.generateFrameNames('cat', {prefix: 'roundkick', end: 8}),
    frameRate: 7
});

this.anims.create({
    key: 'catPunch',
    frames: this.anims.generateFrameNames('cat', {prefix: 'punch', end: 6}),
    frameRate: 7
});

//CAT.JS
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
/*
EXTRA BUTTONS
        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


SWITCH

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
            */