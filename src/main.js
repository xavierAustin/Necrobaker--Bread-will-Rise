// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Cubey
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1024,
    height: 576,
    scene: [Game]
}

const game = new Phaser.Game(config);
var player = {
    health:80,
    maxHealth:80,
    sheild:0,
    thorns:0,
    poison:0,
    stuff:[],
    energy:0,
    damage:0,
    damageTemp:0,
    sheildBuff:0,
    recipes:[{name:"debug",desc:"thing to be printed to the screen",effect:1,cost:[525,525,525],temp:[]}],
    money:4
};
var LEVEL = 0;