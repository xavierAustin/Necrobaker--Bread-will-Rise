class Game extends Phaser.Scene {
    constructor() {
        super('game');
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
        //DEBUG
        player.stuff = [525,505,507,530,494,537,497,518,541,540,539,519]
        //DEBUG

        //clear play area
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 4; j++)
                this.iconlayer.putTileAt(-1,i+12,j+10);

        this.selected = [];

        //enemy creation
        this.enemies = [Math.floor(Math.random()*(2+LEVEL)+LEVEL/10),Math.floor(Math.random()*LEVEL+LEVEL/10)+1,Math.floor(Math.random()*(3+LEVEL)+LEVEL/10)];
        for (let i = 0; i<3; i++)
            switch (Math.min(this.enemies[i],6)){
                case (1): // squid
                    this.monsterlayer.putTileAt(37,11+4*i,4);
                    this.monsterlayer.putTileAt(38,12+4*i,4);
                    this.monsterlayer.putTileAt(53,11+4*i,5);
                    this.monsterlayer.putTileAt(54,12+4*i,5);
                    break;
                case (2): // plant
                    this.monsterlayer.putTileAt(101,11+4*i,4);
                    this.monsterlayer.putTileAt(102,12+4*i,4);
                    this.monsterlayer.putTileAt(117,11+4*i,5);
                    this.monsterlayer.putTileAt(118,12+4*i,5);
                    break;
                case (3): // zombie
                    this.monsterlayer.putTileAt(111,11+4*i,4);
                    this.monsterlayer.putTileAt(112,12+4*i,4);
                    this.monsterlayer.putTileAt(127,11+4*i,5);
                    this.monsterlayer.putTileAt(128,12+4*i,5);
                    break;
                case (4): // mold
                    this.monsterlayer.putTileAt(205,11+4*i,4);
                    this.monsterlayer.putTileAt(206,12+4*i,4);
                    this.monsterlayer.putTileAt(221,11+4*i,5);
                    this.monsterlayer.putTileAt(222,12+4*i,5);
                    break;
                case (5): // carbuncle
                    this.monsterlayer.putTileAt(113,11+4*i,4);
                    this.monsterlayer.putTileAt(114,12+4*i,4);
                    this.monsterlayer.putTileAt(129,11+4*i,5);
                    this.monsterlayer.putTileAt(130,12+4*i,5);
                    break;
                case (6): // abyss
                    this.monsterlayer.putTileAt(211,11+4*i,4);
                    this.monsterlayer.putTileAt(212,12+4*i,4);
                    this.monsterlayer.putTileAt(227,11+4*i,5);
                    this.monsterlayer.putTileAt(228,12+4*i,5);
                    break;
                default: // no enemy
                    this.iconlayer.putTileAt(-1,11+4*i,2);
                    this.iconlayer.putTileAt(-1,12+4*i,2);
                    this.iconlayer.putTileAt(-1,11+4*i,3);
                    this.iconlayer.putTileAt(-1,12+4*i,3);
                    this.iconlayer.putTileAt(-1,11+4*i,4);
                    this.iconlayer.putTileAt(-1,12+4*i,4);
                    this.iconlayer.putTileAt(-1,11+4*i,5);
                    this.iconlayer.putTileAt(-1,12+4*i,5);
                    this.iconlayer.putTileAt(-1,11+4*i,6);
                    this.iconlayer.putTileAt(-1,12+4*i,6);
                    break;
            }
        
        //remove shop UI elements
        this.iconlayer.putTileAt(-1,24,16);
        this.iconlayer.putTileAt(-1,26,16);

        //cake tile has fall off healing so that's what this is for
        this.cakeBoost = 11;
        //handle on click events
        this.input.on('pointerdown',(ev) => {
            let temp = this.map.worldToTileXY(ev.x,ev.y);
            let x = temp.x;
            let y = temp.y;
            let notInList = 1;
            //check if the end turn button is clicked
            if (x > 12 && x < 19 && y == 8){
                //make recipe completion easier to track
                for (let r of player.recipes)
                    r.temp = r.cost.slice();
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
                            player.maxHealth += 0.2;
                            player.maxHealth = Math.ceil(player.maxHealth*10)/10
                            break;
                        case 497: //burger
                            player.health -= 6;
                            player.damageTemp += 2;
                            player.sheild += 8;
                            player.damage += 0.1;
                            player.damage = Math.ceil(player.damage*10)/10
                            break;
                        case 518: //bread
                            player.health += 3;
                            break;
                        case 541: //fish
                            player.sheild += 3;
                            player.maxHealth += 0.1;
                            player.maxHealth = Math.ceil(player.maxHealth*10)/10
                            break;
                        case 540: //steak
                            player.sheild += 3;
                            player.damage += 0.1;
                            player.damage = Math.ceil(player.damage*10)/10
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
                        default: //rotten food
                            break;
                    }
                    //modify stats based on completed recipes
                    for (let r of player.recipes){
                        if (r.temp[0] == i.index)
                            r.temp.shift();
                        if (r.temp.length == 0){
                            r.temp = [-7]
                            this.effectHandler(r.effect);
                        }
                    }
                }
                //deal damage if necessary
                //take damage if necessary
                //update gui to show selected items (no selected items lol)
                for (let i = 0; i < 5+player.energy; i ++)
                    this.iconlayer.putTileAt(605,13+i,15);
                this.selected = [];
                return;
            }
            //check if item has already been selected
            for (let i of this.selected)
                notInList = notInList && !((x == i.x) && (y == i.y));
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
            console.log(this.iconlayer.getTileAt(x,y))
            console.log(ev.x,ev.y)
            //update gui to show selected items
            for (let i = 0; i < 5+player.energy; i ++){
                if(this.selected[i])
                    this.iconlayer.putTileAt(this.selected[i].index,13+i,15);
                else
                    this.iconlayer.putTileAt(605,13+i,15);
            }
        });

        this.miscText = [
            this.add.text(816,78,"Recipes",{fontFamily:"'NIGHTIE'",color:"white",fontSize: 40}).setOrigin(0.5),
            this.add.text(208,78,"Log",{fontFamily:"'NIGHTIE'",color:"white",fontSize: 40}).setOrigin(0.5),
            this.add.text(512,280,"End Turn",{fontFamily:"'NIGHTIE'",color:"white",fontSize: 40}).setOrigin(0.5)
        ];
        this.logText = {
            str: "",
            off: 0,
            vis: this.add.text(208,492,"1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",{fontFamily:"'FOOL'",color:"white",fontSize: 24}).setOrigin(0.5,1)
        };
        this.statText = this.add.text(208,78,"Log",{fontFamily:"'NIGHTIE'",color:"white",fontSize: 40}).setOrigin(0.5)
    }

    update() {
        //quick and dirty way to cap player health and manage play area (not great for optimization but good enough)
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

    effectHandler(val){
        switch(val){
            default:
            console.log("this is a debug effect. if you are seeing this console message... well... you shouldn't be.");
                break;
        }
    }

    updateLog(newString){
        this.logText.str += "\n"+newString;
        this.logText.off = 0;
        this.logText.vis.setText(this.logText.str);
    }

    scrollLog(newOff){
        this.logText.off = newOff;
        this.logText.vis.setText();
    }
}