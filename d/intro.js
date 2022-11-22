class intro extends Phaser.Scene {
  constructor() {
    super({
      key: "intro",
    });

    // Put global variable here
  }
  preload() {
    
    // Step 2 : Preload any images here, nickname, filename
    this.load.image("cover", "assets/intro.jpg");
    
   //sound//
   this.load.audio("bgm", "assets/bgm.mp3");

  }

  create() {
    console.log("*** intro scene");
    this.add.image(0, 0, 'cover').setOrigin(0, 0).setScale(0.6);

    //sound//
    this.bgm = this.sound.add("bgm", {loop: true}).setVolume(0.1);
    this.bgm.stop();
    this.bgm.play();

    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down", function () {
        console.log("Jump to intro2 scene");
        let playerPos = {};
        playerPos.x = 772;
        playerPos.y = 1240;
        // playerPos.dir = "dashu";
        this.scene.start("intro2", { playerPos: playerPos });
      },
      this
    );




    // Create all the game animations here
  }
}

