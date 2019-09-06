import {Baddie} from '../sprites/Baddie.js';

export class Level extends Phaser.Scene {
       
    initScene(cat, enemies, energy, potions){
        this.cat = cat;
        this.enemies = this.physics.add.group(enemies);
        this.enemies.runChildUpdate = true;
        this.energy = this.add.group(energy);
        this.potions = this.physics.add.group(potions);
        ;
        console.log(this.potions);
        
        //console.log(this.energy);

        this.cameras.main.setBounds(0, 0, 800, 640);

        this.cameras.main.startFollow(this.cat, true, 0.5, 0.5);
        this.cameras.main.setZoom(2);

        this.physics.add.collider(this.cat, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.enemyBoundry, function(){
            console.log("enemyboundry");
        });
        this.physics.add.overlap(this.enemies, this.energy, function(energy, baddie){
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
        this.physics.add.overlap(this.cat, this.potions, function(cat, potion){
            console.log('potion');
            potion.destroy();
        });
    }

    update(){
        
    }

    //create bad guys from EnemySpawnPoints object layer
    //could expand upon the ForEach statement and have it add multiple types of bad guys
    createFromObjects(map, name) {
        let objectLayers = map.objects;
        objectLayers.forEach((ol) => {
            console.log(ol.name);
            if (ol.name == name){
                switch(ol.name){
                    case 'EnemySpawnPoints':
                        ol.objects.forEach((olObject) => {
                            let obj = new Baddie({key: 'baddie', scene: this, x: olObject.x, y: olObject.y});
                            this.enemies.push(obj);
                        });
                        break;
                    case 'PlayerSpawnPoint':
                        this.cat = new Cat({key: 'cat', scene: this, x: olObject.x, y: olObject.y});
                        break;
                    case 'Potions':
                        ol.objects.forEach((olObject) => {
                            let obj = this.add.sprite(olObject.x + 8, olObject.y - 8, 'potionsgems', 'greenPotion'); 
                            this.physics.world.enable(obj);
                            obj.body.allowGravity = false;
                            this.potions.push(obj);
                        });
                        break;
                }
            }
        });
    }
}