class Shop extends Phaser.Scene {
    constructor() {
        super('shop');
    }

    preload() {
        //see src/Scenes/Load.js
    }

    create() {
        //add background image
        this.backdrop = this.make.image({x: 512,y: 138,key: 'Backdrop',scale:{x:2,y:2}})

        //create tile map
        this.map = this.add.tilemap("GUI");
        
        //add images to tile map
        this.monsterlayertile = this.map.addTilesetImage("Monsters", "monsterTiles");
        this.iconlayertile = this.map.addTilesetImage("Icons", "iconTiles");
        this.uilayertile = this.map.addTilesetImage("UI Panels", "UITiles");

        //create layers
        this.uilayer = this.map.createLayer("Layer0", this.uilayertile, 0, 0).setScale(2);
        this.iconlayer = this.map.createLayer("Layer1", this.iconlayertile, 0, 0).setScale(2);
        this.monsterlayer = this.map.createLayer("Layer2", this.monsterlayertile, 0, 0).setScale(2);

        //clear play area
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 4; j++)
                this.iconlayer.putTileAt(-1,i+12,j+10);

        this.selected = [];

        //remove battle ui elements
        for (let i = 0; i<3; i++){
            this.iconlayer.putTileAt(-1,11+4*i,2);
            this.iconlayer.putTileAt(-1,12+4*i,2);
            this.iconlayer.putTileAt(-1,11+4*i,3);
            this.iconlayer.putTileAt(-1,12+4*i,3);
            this.iconlayer.putTileAt(-1,11+4*i,6);
            this.iconlayer.putTileAt(-1,12+4*i,6);
        }
        //add shop ui elements
        
        //handle on click events
        this.input.on('pointerdown',(ev) => {
            let temp = this.map.worldToTileXY(ev.x,ev.y);
            let x = temp.x;
            let y = temp.y;
        });
    }

    update() {
        //quick and dirty way to cap player health
        player.health = Math.min(player.health,player.maxHealth);
    }
}