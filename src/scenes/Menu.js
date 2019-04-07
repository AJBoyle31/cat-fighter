class Menu extends Phaser.Scene {
    constructor(){
        super({ key: 'Menu', active: false });
    }
    
    preload () {
        
    }

    create () {
         
        this.scene.start('CatFighter');
        /*
        this.input.once('pointerdown', function(event){
            
        }, this);
        */
    }
    
}

export default Menu;