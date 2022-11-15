class room1 extends Phaser.Scene {
  constructor() {
    super({
      key: "room1",
    });



    // Put global variable here
  }
init (data){
  this.playerPos = data.playerPos
}
  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1", "assets/room1.tmj");

    //tint//
    this.load.image("tint", "assets/tint.jpg")

    // Step 2 : Preload any images here
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");

    //sound//
    this.load.audio("bgm", "assets/bgm.mp3");
    this.load.audio("door", "assets/door.mp3");
    this.load.audio("death", "assets/death.mp3");
    this.load.audio("ending", "assets/ending.mp3");
    this.load.audio("key", "assets/key.mp3");

    //tint//
    this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100})

    // character
    this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});
  }

  create() {
    console.log("*** world scene");

    

    this.doorSnd = this.sound.add("door")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "room1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
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

    this.physics.world.bounds = this.wallLayer

    //Animation
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('taki', { start: 0, end: 2}),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('taki', { start: 9, end: 11}),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key:'up',
      frames: this.anims.generateFrameNumbers('taki', { start: 6, end: 8}),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key:'down',
      frames: this.anims.generateFrameNumbers('taki', { start: 3, end: 5}),
      frameRate: 5,
      repeat: 1,
    });



    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(600, 303, 'taki').setScale(1.5);
    // this.player = this.physics.add.sprite(playerPos.x, playerPos.y, 'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.5);
    window.player = this.player;
    // this.player.setCollideWorldBounds(true);
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);


    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.furnitureLayer, this.player);
    
    

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  } /////////////////// end of create //////////////////////////////

  update() {
    if(this.player.x > 549 && this.player.x < 569 && this.player.y > 260 && this.player.y < 269 ) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
      this.player.flipX = false; // flip the sprite to the left
      //console.log('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("left", true);
      this.player.flipX = true; // use the original sprite looking to the right
      //console.log('right');
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }
  } 
  /////////////////// end of update //////////////////////////////

  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 273;
    playerPos.y = 250;
    playerPos.dir = "up";
    this.scene.start("world",{playerPos: playerPos});
  }
} //////////// end of class world ////////////////////////
