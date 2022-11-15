class intro3 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro3",
    });

    // Put global variable here
  }
  preload() {
    
    // Step 2 : Preload any images here, nickname, filename
    this.load.image("cover", "assets/intro.jpg", );
   
  }

  create() {
    console.log("*** intro3 scene");
    this.add.image(0, 0, 'cover').setOrigin(0, 0).setScale(0.6);

    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {};
        playerPos.x = 772;
        playerPos.y = 1240;
        // playerPos.dir = "dashu";
        this.scene.start("room1", { playerPos: playerPos });
      },
      this
    );




    // Create all the game animations here
  }
}