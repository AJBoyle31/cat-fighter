export class Level extends Phaser.Scene {
    initScene(cat, enemies){
        this.cat = cat;
        this.enemies = this.physics.add.group(enemies);
        this.energy = this.physics.add.group();


        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.baddie, this.platforms);

        this.physics.add.overlap(this.cat, this.enemies, function(cat, enemy){
            console.log('its a hit');
        });
    }

    
}