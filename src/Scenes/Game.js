class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.setPath("./assets/");
        // Load tilemap information
        this.load.image("monsterTiles", "monochrome_32x32.png"); // Packed tilemap
        this.load.image("UITiles", "bone_breakers.png"); // Packed tilemap
        this.load.image("iconTiles", "1bitIcons1.png"); // Packed tilemap
        this.load.image("Backdrop","Background_0.png");
        this.load.tilemapTiledJSON("GUI", "UI.json");
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
        //DEBUG
        player.stuff = [525,505,507,530,494,537,497,518,541,540,539,519] //231
        //DEBUG

        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 4; j++)
                this.iconlayer.putTileAt(player.stuff[Math.floor(Math.random()*player.stuff.length)],i+12,j+10);

        this.selected = [];
        
        this.input.on('pointerdown',(ev) => {
            let temp = this.map.worldToTileXY(ev.x,ev.y);
            let x = temp.x;
            let y = temp.y;
            let notInList = 1;
            //check if item has already been selected
            for (let i of this.selected)
                notInList = notInList && !((x == i.x) && (y == i.y));
            console.log(notInList)
            let prev = this.selected.at(-1) || {x:x-1,y:y-1,index:-1};
            //if item is adjacent to the previously selected item, is not the previously selected item, 
            //falls within the play area, and hasn't been selected already add to selected
            if ((Math.abs(prev.x-x) == 1 || Math.abs(prev.y-y) == 1) && (Math.abs(prev.x-x) + Math.abs(prev.y-y) < 3) 
                && (this.selected.length < 5+player.energy) && (x > 11) && (y > 9) && (y < 14) && (x < 21) && notInList)
                this.selected.push({index:this.iconlayer.getTileAt(x,y).index,x:x,y:y});
            //otherwise remove all items from selected and if the item is within the play area add that item
            else if ((x > 11) && (y > 9) && (y < 14) && (x < 21))
                this.selected = [{index:this.iconlayer.getTileAt(x,y).index,x:x,y:y}];
            else
                this.selected = [];
            //console.log(this.iconlayer.getTileAt(x,y));
            //update gui to show selected items
            for (let i = 0; i < 5+player.energy; i ++){
                if(this.selected[i])
                    this.iconlayer.putTileAt(this.selected[i].index,13+i,15);
                else
                    this.iconlayer.putTileAt(605,13+i,15);
            }
        });
    }

    update() {
        
    }
}