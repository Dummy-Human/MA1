class world2 extends Phaser.Scene {
  constructor() {
    super({
      key: "world2",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world2", "assets/hall2.tmj");

    // Step 2 : Preload any images here
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");

    // character
    this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("hunter", "assets/hunter.png", { frameWidth:62, frameHeight: 62});
  
    //tint//
    this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100});

    //sound//
    this.load.audio("death", "assets/death.mp3");
    this.load.audio("door", "assets/door.mp3");
    this.load.audio("key", "assets/key.mp3");
  }

  create() {
    console.log("*** world scene");

    //sound//
    this.doorSnd = this.sound.add("door")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world2" });

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
    this.stairLayer = map.createLayer("stairs",tilesArray,0,0);
    this.floorLayer = map.createLayer("floor",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    this.lockerLayer = map.createLayer("lockers",tilesArray,0,0);
    this.cab2Layer = map.createLayer("cabinet2", tilesArray,0,0);
    this.cab1Layer = map.createLayer("cabinet1",tilesArray,0,0);

    this.physics.world.bounds = this.wallLayer
   
//Animation
    //character
   


    // Add main player here with physics.add.sprite
    
    this.player = this.physics.add.sprite(400,650, 'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.5);
    window.player = this.player;
    
    const image = this.add.image(0, 0, 'tint').setScale(1000);
    image.setAlpha(0.6);

    this.hunt = this.physics.add.sprite(300,650, "hunter").setScale(2);
    this.hunt.alpha = 0.5
    this.hunt.body.setSize (this.hunt.width * 0.1, this.hunt.height * 0.1);

    this.player.setCollideWorldBounds(true);
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.lockerLayer.setCollisionByExclusion(-1, true)
    this.cab1Layer.setCollisionByExclusion(-1, true)
    this.cab2Layer.setCollisionByExclusion(-1, true)
    this.doorLayer.setCollisionByExclusion(-1,true)
    
    

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);


    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.lockerLayer, this.player);
    this.physics.add.collider(this.cab2Layer, this.player);
    this.physics.add.collider(this.wallLayer, this.hunt);
    this.physics.add.collider(this.doorLayer, this.hunt);
    this.physics.add.collider(this.player, this.hunt);
    

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 170, 1020, 600);
  } /////////////////// end of create //////////////////////////////

  update() {

    ///world///
    if(this.player.x > 89 && this.player.x < 100 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

     if(this.player.x > 80 && this.player.x < 100 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

     if(this.player.x > 80 && this.player.x < 100 && this.player.y > 620 && this.player.y < 640) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

     if(this.player.x > 920 && this.player.x < 940 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

     if(this.player.x > 910 && this.player.x < 940 && this.player.y > 620 && this.player.y < 640) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
     }

     ///rooms///
     if(this.player.x > 268 && this.player.x < 276 && this.player.y > 375 && this.player.y < 381) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room5();
     }

     if(this.player.x > 740 && this.player.x < 760 && this.player.y > 375 && this.player.y < 381) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room6();
     }

     if(this.player.x > 268 && this.player.x < 276 && this.player.y > 580 && this.player.y < 596) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room7();
     }

     if(this.player.x > 740 && this.player.x < 760 && this.player.y > 580 && this.player.y < 596) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room8();
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

    //follow player
    this.physics.moveToObject(this.hunt, this.player,30,2000)

  } /////////////////// end of update //////////////////////////////

  // room1(player, tile) {
  //   console.log("room1 function");
  //   let playerPos = {};
  //   playerPos.x = 563;
  //   playerPos.y = 303;
  //   playerPos.dir = "down";
  //   this.scene.start("room1");
  // }
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 100;
    playerPos.y = 360;
    playerPos.dir = "right";
    this.scene.start("world");
  }

  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 100;
    playerPos.y = 360;
    playerPos.dir = "right";
    this.scene.start("world");
  }

  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 100;
    playerPos.y = 360;
    playerPos.dir = "right";
    this.scene.start("world");
  }

  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 100;
    playerPos.y = 360;
    playerPos.dir = "right";
    this.scene.start("world");
  }

  room5(player, tile) {
    console.log("room5 function");
    let playerPos = {};
    playerPos.x = 556;
    playerPos.y = 283;
    playerPos.dir = "down";
    this.scene.start("room5",{playerPos: playerPos});
  }

  room6(player, tile) {
    console.log("room6 function");
    let playerPos = {};
    playerPos.x = 556;
    playerPos.y = 283;
    playerPos.dir = "down";
    this.scene.start("room6",{playerPos: playerPos});
  }

  room7(player, tile) {
    console.log("room7 function");
    let playerPos = {};
    playerPos.x = 556;
    playerPos.y = 283;
    playerPos.dir = "down";
    this.scene.start("room7",{playerPos: playerPos});
  }

  room8(player, tile) {
    console.log("room8 function");
    let playerPos = {};
    playerPos.x = 556;
    playerPos.y = 283;
    playerPos.dir = "down";
    this.scene.start("room8",{playerPos: playerPos});
} 
}//////////// end of class world ////////////////////////
