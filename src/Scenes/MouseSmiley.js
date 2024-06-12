class MouseSmiley extends Phaser.Scene {
    constructor() {
        super('mouseSmiley');
        this.my = {sprite: {}};
    }

    preload() {
        document.getElementById('description').innerHTML = '<h2>mouseSmiley.js</h2>';
    }

    create() {
        this.my.sprite.sprites = [];
        
        this.input.on('pointerdown',(event) => {
            let my = this.my;
            my.sprite.sprites = this.add.sprite(event.x,event.y, "yellowBody");
            my.sprite.smile = this.add.sprite(event.x, event.y+20, "smile");
            my.sprite.leftOpenHand = this.add.sprite(event.x-125, event.y+20, "handOpen");
            my.sprite.leftOpenHand.flipX = true;
            my.sprite.rightOpenHand = this.add.sprite(event.x+125, event.y+20, "handOpen");
        });
    }

    update() {
        
    }
}