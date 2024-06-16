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
    scene: [Load,Game,Shop,Title]
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
    recipes:[],
    money:4
};
var LEVEL = 0;
const RECIPES = [
    {
        name:"Voodoo Burger",
        desc:"Fistuned with fried goat jowl. Replace one tile with a burger tile. Deal 45 damage to the target enemy. Gain 15 sheild. Reduce your maximum hp by 5.",
        effect: 0,
        cost:[525,525,525],
        temp:[]
    },
    {
        name:"Sinnful Cake",
        desc:"Decadent and deadly. Replace one tile with a cake tile. Deal 20 damage to the target enemy. Apply 20 poison. Take 10 damage.",
        effect: 1,
        cost:[525,525,525],
        temp:[]
    },
    {
        name:"Eden's Fruit Salad",
        desc:"Drive away both gods grace and doctors. Replace 3 tiles with rot. Increase your maximum hp by 5. Increase your passive damage by 5. Gain 5 thorns.  Gain 15 sheild.",
        effect: 2,
        cost:[525,525,525],
        temp:[]
    }
];