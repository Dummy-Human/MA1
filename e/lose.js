class lose extends Phaser.Scene {
  constructor() {
    super({
      key: "lose",
    });

    // Put global variable here
  }
  preload() {
    
    // Step 2 : Preload any images here, nickname, filename
    this.load.image("death", "assets/skull.png");

    this.load.audio( "dead", "assets/death.mp3")

  }

  create() {
    console.log("*** intro scene");

    const image = this.add.image(160, 50, 'death').setScale(1);

    let deadSnd = this.sound.add("dead")
    deadSnd.play();

    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down", function () {
        console.log("Jump to intro scene");
        let playerPos = {};
        playerPos.x = 772;
        playerPos.y = 240;
        this.scene.start("intro2");
      },
      this
    );

    this.add.text(20, 60, "YOU WERE CAUGHT", {
      font: "10px Dogica light",
      fill: "#FF0000"
    });
    this.add.text(20, 80, "Press SPACE to replay", {
      font: "5px Dogica light",
      fill: "#ffffff"
    });




    // Create all the game animations here
  }
}

