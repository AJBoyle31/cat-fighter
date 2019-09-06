class Preload extends Phaser.Scene {
    constructor(){
        super({ key: 'Preload', active: false });
    }

    preload(){

        this.load.atlas('cat', 'src/assets/catFighterSpritesheet.png', 'src/assets/catfightersprites.json');
        this.load.atlas('cat2', 'src/assets/catFighterSpritesheet2.png', 'src/assets/catFighterSpritesheet2.json');
        this.load.atlas('energy', 'src/assets/energySpritesheet.png', 'src/assets/energySpritesheet.json');
        this.load.atlas('potionsgems', 'src/assets/tileset-16x16.png', 'src/assets/potionsgems.json');
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/platform.png');
        this.load.spritesheet('baddie', 'src/assets/baddie.png', {frameWidth: 32, frameHeight: 32});

        //http://www.html5gamedevs.com/topic/42308-working-with-texture-atlas-and-phaser-3/
        //could be how to add the potions to the level
    }

    create(){

        this.anims.create({
            key: 'catIdle',
            frames: this.anims.generateFrameNames('cat', {prefix: 'idle', end: 5}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'catWalk',
            frames: this.anims.generateFrameNames('cat', {prefix: 'walk', end: 9}),
            frameRate: 14,
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
            key: 'catTwoside',
            frames: this.anims.generateFrameNames('cat', {prefix: 'twoside', end: 8}),
            frameRate: 7
        });

        this.anims.create({
            key: 'catSuperChargeShot',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'superShot', start: 11, end: 23}),
            frameRate: 8
        });

        this.anims.create({
            key: 'catPowerShotAir',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'powerShotAir', end: 7}),
            frameRate: 7
        });

        this.anims.create({
            key: 'catFastShotAir',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'fastShotAir', end: 6}),
            frameRate: 7
        });

        this.anims.create({
            key: 'catJumpShotFront',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'jumpShotFront', end: 6}),
            frameRate: 13
        });

        this.anims.create({
            key: 'catJumpShotDown',
            frames: this.anims.generateFrameNames('cat2', {prefix: 'jumpShotDown', end: 6}),
            frameRate: 13
        });

        //ENERGY SHOTS

        this.anims.create({
            key: 'catRegShotFront',
            frames: this.anims.generateFrameNames('energy', {prefix: 'regShotFront', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catRegShotFrontHit',
            frames: this.anims.generateFrameNames('energy', {prefix: 'regShotFront', start: 5, end: 7}),
            frameRate: 20
        });

        this.anims.create({
            key: 'catSuperShot',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShot', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catSuperShotHit',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShot', start: 5, end: 7}),
            frameRate: 20
        });

        this.anims.create({
            key: 'catRegShotUp',
            frames: this.anims.generateFrameNames('energy', {prefix: 'regShotUp', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catRegShotUpHit',
            frames: this.anims.generateFrameNames('energy',{prefix: 'regShotUp', start: 5, end: 7}),
            frameRate: 10
        });

        this.anims.create({
            key: 'catRegShotDown',
            frames: this.anims.generateFrameNames('energy', {prefix: 'regShotDown', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catRegShotDownHit',
            frames: this.anims.generateFrameNames('energy', {prefix: 'regShotDown', start: 5, end: 7}),
            frameRate: 10
        });

        this.anims.create({
            key: 'catPowerShotFront',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShotFront', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catPowerShotFrontHit',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShotFront', start: 5, end: 7}),
            frameRate: 10
        });

        this.anims.create({
            key: 'catSuperShotUp',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShotUp', start: 1, end: 4}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'catSuperShotUpHit',
            frames: this.anims.generateFrameNames('energy', {prefix: 'superShotUp', start: 5, end: 7}),
            frameRate: 10
        });


        //BADDIE
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