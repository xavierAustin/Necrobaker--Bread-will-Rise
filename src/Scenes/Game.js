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
        player.stuff = [525,505,507,530,494,537,497,518,541,540,539,519]
        //DEBUG

        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 4; j++)
                this.iconlayer.putTileAt(-1,i+12,j+10);

        this.selected = [];
        
        this.cakeBoost = 11;
        this.input.on('pointerdown',(ev) => {
            let temp = this.map.worldToTileXY(ev.x,ev.y);
            let x = temp.x;
            let y = temp.y;
            let notInList = 1;
            //check if the end turn button is clicked
            if (x > 12 && x < 19 && y == 8){
                for (let i of this.selected){
                    //remove selected tiles
                    this.iconlayer.putTileAt(-1,i.x,i.y);
                    //modify stats based on selected tiles
                    switch(i.index){
                        case 525: //apple
                            player.health += 2;
                            break;
                        case 505: //pineapple
                            player.health += 1;
                            player.thorns += 1;
                            break;
                        case 507: //eggplant
                            player.health += 5;
                            player.thorns += 15;
                            player.damageTemp += 15;
                            player.poison += 20;
                            break;
                        case 530: //strawberry
                            player.health += 1;
                            player.damageTemp += 1;
                            break;
                        case 494: //chocolate
                            player.damageTemp += 2;
                            player.sheild += 2;
                            break;
                        case 537: //cake
                            player.health += Math.max(this.cakeBoost--,0);
                            break;
                        case 497: //burger
                            player.health -= 6;
                            player.damageTemp += 2;
                            player.sheild += 8;
                            break;
                        case 518: //bread
                            player.health += 3;
                            break;
                        case 541: //fish
                            player.sheild += 5;
                            player.maxHealth += 0.05;
                            break;
                        case 540: //steak
                            player.sheild += 5;
                            player.damage += 0.05;
                            break;
                        case 539: //cheese
                            player.damageTemp += Math.ceil(Math.random()*5);
                            break;
                        case 519: //egg
                            player.health += 4;
                            if (!Math.floor(Math.random()*5))
                                player.poison += 15;
                            player.sheild += 2;
                            break;
                        default:
                            break;
                    }
                    console.log(player);
                    //modify stats based on completed recipes [541,540,539,519]
                }
                //update gui to show selected items (no selected items lol)
                for (let i = 0; i < 5+player.energy; i ++)
                    this.iconlayer.putTileAt(605,13+i,15);
                this.selected = [];
                return;
            }
            //check if item has already been selected
            for (let i of this.selected)
                notInList = notInList && !((x == i.x) && (y == i.y));
            console.log(x,y)
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
        player.health = Math.min(player.health,player.maxHealth);
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 4; j++){
                //check if there are any empty spaces caused by clearing tiles
                //move cleared tile spaces to the top of the play area
                let above = this.iconlayer.getTileAt(i+12,j+9);
                if (this.iconlayer.getTileAt(i+12,j+10) == null &&  above != null && j){
                    this.iconlayer.putTileAt(above,i+12,j+10);
                    this.iconlayer.putTileAt(-1,i+12,j+9);
                    j = 0;
                //otherwise fill cleared tile spaces with other tiles
                }else if (this.iconlayer.getTileAt(i+12,j+10) == null)
                    this.iconlayer.putTileAt(player.stuff[Math.floor(Math.random()*player.stuff.length)],i+12,j+10);
            }
    }
}