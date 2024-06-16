function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

loadFont("FOOL", "./assets/fonts/Fool.ttf");
loadFont("HALLOWEEN", "./assets/fonts/Halloweenpixels.ttf");
loadFont("NIGHTIE", "./assets/fonts/NicerNightie.ttf");

class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }

    preload() {
        this.load.setPath("./assets/");
        //load tilemap information
        this.load.image("monsterTiles", "monochrome_32x32.png");
        this.load.image("UITiles", "bone_breakers.png");
        this.load.image("iconTiles", "1bitIcons1.png");
        this.load.tilemapTiledJSON("GUI", "UI.json");
        //load backdrop image
        this.load.image("Backdrop","background.png");
        //load sounds
    }

    create() {
        this.scene.start("title");
    }

    update() {
        //Sorry Nothing!
    }
}

String.prototype.lineSlice = function(start,total){
    total = total || 1;
    out = "";
    num = 0;
    for (i = 0; i < this.length && num < start+total; i ++){
        num += (this[i] == "\n");
        if (num >= start)
            out += this[i];
    }
    return out;
}