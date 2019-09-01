export class Level extends Phaser.Scene {
    initScene(cat, enemies, energy){
        this.cat = cat;
        this.enemies = this.physics.add.group(enemies);
        this.energy = this.add.group(energy);
        
        //console.log(this.energy);

        this.cameras.main.setBounds(0, 0, 800, 640);

        this.cameras.main.startFollow(this.cat, true, 0.5, 0.5);
        this.cameras.main.setZoom(2);

        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.baddie, this.platforms);
        this.physics.add.collider(this.baddie, this.enemyBoundry, function(){
            console.log("enemyboundry");
        });
        this.physics.add.overlap(this.baddie, this.energy, function(baddie, energy){
            console.log('energy hit');
            energy.hit();
            baddie.kill();
        });
        
        this.physics.add.collider(this.energy, this.platforms, function(energy){
            energy.hit();
        })
        
        this.physics.add.overlap(this.cat, this.enemies, function(cat, enemy){
            console.log('its a hit');
        
        });
    }

    update(){
        
    }

    
}