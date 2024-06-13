class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        
    }

    create() {
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
    }

    update() {
        this.scene.start("game");
    }
}