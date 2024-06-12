class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.setPath("./assets/");
        // Load tilemap information
        this.load.image("monsterTiles", ".png"); // Packed tilemap
        this.load.image("UITiles", ".png"); // Packed tilemap
        this.load.image("iconTiles", ".png"); // Packed tilemap
        this.load.tilemapTiledJSON("platformer-level-1", "UI.json");
    }

    create() {
        
        
        this.input.on('pointerdown',(event) => {
            
        });
    }

    update() {
        
    }
}