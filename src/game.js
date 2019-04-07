import 'phaser';
import BootScene from './scenes/BootScene.js';
import Preload from './scenes/Preload.js';
import Menu from './scenes/Menu.js';
import CatFighter from './scenes/CatFighter.js';


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    //backgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 300},
            debug: true
        }
    },
    pixelArt: true,
    roundPixels: true,
    scene: [BootScene, Preload, Menu, CatFighter]
};

new Phaser.Game(config);