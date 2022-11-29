class intro3 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro3",
    });

    // Put global variable here
  }
  preload() {
    
    // Step 2 : Preload any images here, nickname, filename
    this.load.tilemapTiledJSON("room1", "assets/room1.tmj");

    //tint//
    this.load.image("tint", "assets/tint.jpg")

    // Step 2 : Preload any images here
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");


     
  //tint//
  this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100})

  //dialog1//
  this.load.spritesheet( "dialog1", "assets/dialog1.png", { frameHeight: 370, frameWidth: 1200})

  // character
  this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});

  }

  create() {
    console.log("*** intro scene");

    let map = this.make.tilemap({ key: "room1" });

    this.anims.create({
      key:'speech',
      frames: this.anims.generateFrameNumbers('dialog1', { start: 0, end: 10}),
      frameRate: 0.3,
      repeat: 0,
    });



    let classTiles = map.addTilesetImage("class", "classimg");
    let gramTiles = map.addTilesetImage("gram", "gramimg");
    let groundTiles = map.addTilesetImage("ground", "groundimg");
    let lockerTiles = map.addTilesetImage("lockers", "lockerimg");
    let windowTiles = map.addTilesetImage("window", "windowimg");

    // Step 5  create an array of tiles
    let tilesArray = [
      classTiles, 
      gramTiles, 
      groundTiles, 
      lockerTiles, 
      windowTiles
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    this.furnitureLayer = map.createLayer("furniture",tilesArray,0,0);

    this.player = this.physics.add.sprite(560, 420,'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.5);
    window.player = this.player;

    //tint//
    const image = this.add.image(0, 0, 'tint').setScale(1000);
    image.setAlpha(0.6);

    ///dialog///
    this.physics.add.sprite(560,460, "dialog1").setScale(0.15).play('speech');

    this.cameras.main.startFollow(this.player);

    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down", function () {
        console.log("Jump to room1 scene");
        this.player.x = 560;
        this.player.y = 420;
        this.scene.start("room1",{player: this.player});
      },
      this
    );

    this.add.text(653, 480, "Spacebar...", {
      font: "6px Dogica light",
      fill: "#ffffff"
    });


    // Create all the game animations here
  }
  
}