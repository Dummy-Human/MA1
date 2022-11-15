class room7 extends Phaser.Scene {
    constructor() {
      super({
        key: "room7",
      });
  
  
  
      // Put global variable here
    }
  init (data){
    this.playerPos = data.playerPos
  }
    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("room7", "assets/room3.tmj");
  
      // Step 2 : Preload any images here
      this.load.image("classimg", "assets/class.png");
      this.load.image("gramimg", "assets/gram.png");
      this.load.image("groundimg", "assets/ground.png");
      this.load.image("lockerimg", "assets/lockers.png");
      this.load.image("windowimg", "assets/window.png");
  
      // character
      this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});
    }
  
    create() {
      console.log("*** world scene");
  
      //Step 3 - Create the map from main
      let map = this.make.tilemap({ key: "room7" });
  
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
      this.doorLayer = map.createLayer("door",tilesArray,512,0);
      this.furnitureLayer = map.createLayer("furniture",tilesArray,0,0);
  
      this.physics.world.bounds = this.wallLayer
  
      //Animation
      
  
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
      if(this.player.x > 540 && this.player.x < 570 && this.player.y > 700 && this.player.y < 705 ) {
        console.log("Jump to world")
        this.world2();
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
  
    world2(player, tile) {
      console.log("world2 function");
      let playerPos = {};
      playerPos.x = 273;
      playerPos.y = 250;
      playerPos.dir = "up";
      this.scene.start("world2",{playerPos: playerPos});
    }
  } //////////// end of class world ////////////////////////