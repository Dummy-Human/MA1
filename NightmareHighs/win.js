class win extends Phaser.Scene {
  constructor() {
    super({
      key: "win",
    });

    // Put global variable here
  }
  preload() {

  //dialog1//
  this.load.spritesheet( "winAnim", "assets/winAnim.png", { frameHeight: 500, frameWidth: 500})

  this.load.audio( "winner", "assets/ending.mp3")
  }

  create() {
    console.log("*** win");

    this.anims.create({
      key:'winner',
      frames: this.anims.generateFrameNumbers('winAnim', { start: 0, end: 6}),
      frameRate: 3,
      repeat: 0,
    });

    ///dialog///
    this.physics.add.sprite(160,100, "winAnim").play('winner');

    let endingSnd = this.sound.add("winner")
    endingSnd.loop = false;
    endingSnd.play();
    

    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down", function () {
        console.log("Jump to room1 scene");
        this.scene.start("intro2");
      },
      this
    );

    this.add.text(60, 100, "It was just a dream...", {
      font: "10px Dogica light",
      fill: "#000000"
    });

    this.add.text(110, 120, "Press SPACE to replay", {
      font: "5px Dogica light",
      fill: "#000000"
    });


    // Create all the game animations here
  }
  
}