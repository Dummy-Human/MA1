class intro extends Phaser.Scene {
  constructor() {
    super({
      key: "intro",
    });

    // Put global variable here
  }
  preload() {
    

    //room preload//
    this.load.tilemapTiledJSON("room1", "assets/room1.tmj");


    //tint//
    this.load.image("tint", "assets/tint.jpg")


    //image preload//
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");

     
  //tint//
  this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100})


  //character//
  this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});
   

  //sound//
  this.load.audio("bgm", "assets/bgm.mp3");

  }

  create() {
    console.log("*** intro scene");


    //sound//
    this.bgm = this.sound.add("bgm", {loop: true}).setVolume(0.1);
    this.bgm.stop();
    this.bgm.play();


    //map//
    let map = this.make.tilemap({ key: "room1" });


    //tiles used//
    let classTiles = map.addTilesetImage("class", "classimg");
    let gramTiles = map.addTilesetImage("gram", "gramimg");
    let groundTiles = map.addTilesetImage("ground", "groundimg");
    let lockerTiles = map.addTilesetImage("lockers", "lockerimg");
    let windowTiles = map.addTilesetImage("window", "windowimg");


    //arrays//
    let tilesArray = [
      classTiles, 
      gramTiles, 
      groundTiles, 
      lockerTiles, 
      windowTiles
    ];


    //layers in tiled//
    this.floorLayer = map.createLayer("floor",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    this.furnitureLayer = map.createLayer("furniture",tilesArray,0,0);


    //character//
    this.player = this.physics.add.sprite(560, 420,'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.5);
    window.player = this.player;


    //tint//
    const image = this.add.image(0, 0, 'tint').setScale(1000);
    image.setAlpha(0.6);


    //camera//
    this.cameras.main.startFollow(this.player);


    //control call//
    var spaceDown = this.input.keyboard.addKey("SPACE");


    //control exe//
    spaceDown.on(
      "down", function () {
      console.log("Jump to intro2 scene");
      this.scene.start("intro2");
      },
      this
    );

    //text//
    this.add.text(440, 380, "Press spacebar to continue", {
    font: "10px Dogica",
    fill: "#ffffff"
    });
  }
  
}

