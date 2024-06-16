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