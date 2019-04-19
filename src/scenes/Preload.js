class Preload extends Phaser.Scene {
    constructor(){
        super({ key: 'Preload', active: false });
    }
    
    preload(){
        
        this.load.atlas('cat', 'src/assets/catFighterSpritesheet.png', 'src/assets/catfightersprites.json');
        this.load.atlas('cat2', 'src/assets/catFighterSpritesheet2.png', 'src/assets/catFighterSpritesheet2.json');
        this.load.atlas('energy', 'src/assets/energySpritesheet.png', 'src/assets/energySpritesheet.json');
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/platform.png');
        this.load.spritesheet('baddie', 'src/assets/baddie.png', {frameWidth: 32, frameHeight: 32});
    }
    
    create(){
        
        this.anims.create({
            key: 'catIdle',
            frames: this.anims.generateFrameNames('cat', {prefix: 'idle', end: 5}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catWalk',
            frames: this.anims.generateFrameNames('cat', {prefix: 'walk', end: 9}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catJump',
            frames: this.anims.generateFrameNames('cat', {prefix: 'jumpup', end: 3}),
            frameRate: 7,
        });
        
        this.anims.create({
            key: 'catAir',
            frames: this.anims.generateFrameNames('cat', {prefix: 'inair', end: 3}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catLand',
            frames: this.anims.generateFrameNames('cat', {prefix: 'jumpdown', end: 5}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catPowershot',
            frames: this.anims.generateFrameNames('cat', {prefix: 'powershot', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catFastshot', 
            frames: this.anims.generateFrameNames('cat', {prefix: 'fastshot', end: 6}),
            frameRate: 7
        });
        
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
            key: 'catTwoside',
            frames: this.anims.generateFrameNames('cat', {prefix: 'twoside', end: 8}),
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

        this.anims.create({
            key: 'superChargeShot',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'superShot', start: 11, end: 23}),
            frameRate: 8
        });

        

        this.anims.create({
            key: 'baddieLeft',
            frames: this.anims.generateFrameNumbers('baddie', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'baddieRight',
            frames: this.anims.generateFrameNumbers('baddie', {start: 2, end: 3}),
            frameRate: 5,
            repeat: -1
        });


        
        this.scene.start('Menu');
    }
}

export default Preload;