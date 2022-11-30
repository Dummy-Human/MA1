class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }


  init(data){
    this.player = data.player
    this.inventory = data.inventory
  }


  preload() {
    //JSON//
    this.load.tilemapTiledJSON("world", "assets/hall1.tmj");


    //image load//
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");
    this.load.image( "lock", "assets/lock.png");


    //character//
    this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});


    //enemy//
    this.load.spritesheet("hunter", "assets/hunter.png", { frameWidth:64, frameHeight: 64})


    //tint//
    this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100})


    //sound//
    this.load.audio("bgm", "assets/bgm.mp3")
    this.load.audio("death", "assets/death.mp3")
    this.load.audio("door", "assets/door.mp3")
    this.load.audio("ending", "assets/ending.mp3")
    this.load.audio("key", "assets/key.mp3")
    this.load.audio("unlock", "assets/unlock.mp3")
  }

  create() {
    console.log("*** world scene");


    //sound//
    this.doorSnd = this.sound.add("door")

    this.unlockSnd = this.sound.add("unlock")
    this.unlockSnd.play();


    //map//
    let map = this.make.tilemap({ key: "world" });


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
    this.lockerLayer = map.createLayer("lockers",tilesArray,0,0);
    this.cab2Layer = map.createLayer("cabinet2", tilesArray,0,0);
    this.stairLayer = map.createLayer("stairs",tilesArray,0,0);
    this.cab1Layer = map.createLayer("cabinet1",tilesArray,0,0);
    this.decoLayer = map.createLayer("deco",tilesArray,0,0);

    this.physics.world.bounds = this.wallLayer
   

    //Animation//
    //character movement//
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


    //lock//
    this.lock = this.add.image(510,265, "lock").setScale(0.8);


    //character//
    this.player = this.physics.add.sprite(this.player.x, this.player.y, 'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.8, true);
    window.player = this.player;


    //tint//
    const image = this.add.image(0, 0, 'tint').setScale(1000);
    image.setAlpha(0.6);


    //enemy//
    this.hunt = this.physics.add.sprite(500,630, "hunter").setScale(2);
    this.hunt.alpha = 0.5
    this.hunt.body.setCircle(20, 12, 12);
        

    //adding collision//
    this.player.setCollideWorldBounds(true);
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.lockerLayer.setCollisionByExclusion(-1, true)
    this.cab1Layer.setCollisionByExclusion(-1, true)
    this.cab2Layer.setCollisionByExclusion(-1, true)
    this.doorLayer.setCollisionByExclusion(-1,true)
    
        
    //collision//
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.lockerLayer, this.player);
    this.physics.add.collider(this.cab2Layer, this.player);
    this.physics.add.collider(this.wallLayer, this.hunt);
    this.physics.add.overlap(this.lock, this.player, this.overlap2, null, this);
    this.physics.add.overlap(this.hunt, this.player, this.death, null, this);


    //control call/
    this.cursors = this.input.keyboard.createCursorKeys();


    // camera follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 170, 1020, 600);

  } 
  /////////////////// end of create //////////////////////////////

  update() {


    ///rooms///
    if(this.player.x > 268 && this.player.x < 276 && this.player.y > 375 && this.player.y < 381) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room1();
     }

     if(this.player.x > 740 && this.player.x < 760 && this.player.y > 375 && this.player.y < 381) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room2();
     }

     if(this.player.x > 268 && this.player.x < 276 && this.player.y > 580 && this.player.y < 596) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room3();
     }

     if(this.player.x > 740 && this.player.x < 760 && this.player.y > 580 && this.player.y < 596) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.room4();
     }

     
     ///world///
     if(this.player.x > 80 && this.player.x < 100 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world1")
      this.doorSnd.play();
      this.world2a();
     }

     if(this.player.x > 80 && this.player.x < 100 && this.player.y > 600 && this.player.y < 670) {
      console.log("Jump to world1")
      this.doorSnd.play();
      this.world2b();
     }

     if(this.player.x > 920 && this.player.x < 940 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world3")
      this.doorSnd.play();
      this.world2c();
     }

     if(this.player.x > 920 && this.player.x < 940 && this.player.y > 620 && this.player.y < 700) {
      console.log("Jump to world4")
      this.doorSnd.play();
      this.world2d();
     }


     //controls exe//
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


    //escape//
   if 
   (this.player.x > 490 && 
    this.player.x < 535 && 
    this.player.y < 284 &&
     window.key > 2 ) 
   {
      console.log("KEYS!", window.key);
      this.lock.setAlpha(5);
      this.win();
    } 
    
    if ( this.player.x > 490 && 
      this.player.x < 535 &&
      this.player.y < 284 &&
      window.key < 3 )
    {
      console.log("No key :( ", window.key);
    }


    //lock unlock//
    if (window.key < 3){
      this.lock.setVisible(true)
    } else if (window.key > 2){
      this.lock.setVisible(false)
      
    }


    if (window.key < 3){
      this.unlockSnd.stop();
    } else if (window.key > 2){
      this.unlockSnd.play(1);
    }


    //enemy follow player//
    this.physics.moveToObject(this.hunt, this.player,30,600)

  } 
  /////////////////// end of update //////////////////////////////


  ///rooms///
  room1(player, tile) {
    console.log("room1 function");
    this.player.x = 560;
    this.player.y = 287;
    this.scene.start("room1",{player: this.player});
  }
  room2(player, tile) {
    console.log("room1 function");
    this.player.x = 880;
    this.player.y = 290;
    this.scene.start("room2",{player: this.player});
  }

  room3(player, tile) {
    console.log("room3 function");
    this.player.x = 560;
    this.player.y = 685;
    this.scene.start("room3",{player: this.player});
  }

  room4(player, tile) {
    console.log("room4 function");
    this.player.x = 880;
    this.player.y = 688;
    this.scene.start("room4",{player: this.player});
  }


  ///world///
  world2a(player, tile) {
    console.log("world1 function");
    this.player.x = 110;
    this.player.y = 355;
    this.scene.start("world2",{player: this.player});
  }

  world2b(player, tile) {
    console.log("world2 function");
    this.player.x = 110;
    this.player.y = 620;
    this.scene.start("world2",{player: this.player});
  }

  world2c(player, tile) {
    console.log("world3 function");
    this.player.x = 915;
    this.player.y = 355;
    this.scene.start("world2",{player: this.player});
  }

  world2d(player, tile) {
    console.log("world4 function");
    this.player.x = 915;
    this.player.y = 620;
    this.scene.start("world2",{player: this.player});
  }


  //death//
  death( player, tile){
    console.log("You died");
    this.scene.start("lose");
    window.key = 0
  }


  //win//
  win(player, tile){
    console.log("ESCAPED");
    this.scene.start("win");
  }

} 
//////////// end of class world ////////////////////////