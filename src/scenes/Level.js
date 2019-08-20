export class Level extends Phaser.Scene {
    initScene(cat, enemies, energy){
        this.cat = cat;
        this.enemies = this.physics.add.group(enemies);
        this.energy = this.add.group(energy);
        
        console.log(this.energy);

        

        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.baddie, this.platforms);
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