class BootScene extends Phaser.Scene {
    constructor(){
        super({ key: 'Boot', active: true });
    }
    
    preload(){
        
    }
    
    create(){
        this.scene.start('Preload');
    }
}

export default BootScene;