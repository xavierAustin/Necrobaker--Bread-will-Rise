class Game extends Phaser.Scene {
    constructor() {
        super('game');
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
    }

    create() {
        //TODO: switch to title
        this.scene.start("game");
    }

    update() {
        //Sorry Nothing!
    }
}