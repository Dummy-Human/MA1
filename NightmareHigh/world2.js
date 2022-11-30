class world2 extends Phaser.Scene {
  constructor() {
    super({
      key: "world2",
    });
  }


  init(data){
    this.player = data.player
    this.inventory = data.inventory
  }

  
  preload() {
    //JSON//
    this.load.tilemapTiledJSON("world2", "assets/hall2.tmj");

    //image load//
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");


    //character//
    this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});


    //enemy//
    this.load.spritesheet("hunter", "assets/hunter.png", { frameWidth:62, frameHeight: 62});
  

    //tint//
    this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100});


    //sound//
    this.load.audio("death", "assets/death.mp3");
    this.load.audio("door", "assets/door.mp3");
    this.load.audio("key", "assets/key.mp3");
    this.load.audio("unlock", "assets/unlock.mp3");

  }

  create() {
    console.log("*** world scene");

    //sound//
    this.doorSnd = this.sound.add("door")

    this.unlockSnd = this.sound.add("unlock")
    this.unlockSnd.play();

    //map//
    let map = this.make.tilemap({ key: "world2" });

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
    this.stairLayer = map.createLayer("stairs",tilesArray,0,0);
    this.floorLayer = map.createLayer("floor",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    this.lockerLayer = map.createLayer("lockers",tilesArray,0,0);
    this.cab2Layer = map.createLayer("cabinet2", tilesArray,0,0);
    this.cab1Layer = map.createLayer("cabinet1",tilesArray,0,0);

    this.physics.world.bounds = this.wallLayer
  

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
    this.physics.add.collider(this.doorLayer, this.hunt);
    this.physics.add.overlap(this.hunt, this.player, this.death, null, this);

    
    //control call//
    this.cursors = this.input.keyboard.createCursorKeys();

    //camera//
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 170, 1020, 600);
  } /////////////////// end of create //////////////////////////////

  update() {


    ///world///
    if(this.player.x > 80 && this.player.x < 100 && this.player.y > 332 && this.player.y < 372) {
      console.log("Jump to world1")
      this.doorSnd.play();
      this.worlda();
     }

     if(this.player.x > 80 && this.player.x < 100 && this.player.y > 600 && this.player.y < 670) {
      console.log("Jump to world1")
      this.doorSnd.play();
      this.worldb();
     }

     if(this.player.x > 920 && this.player.x < 940 && this.player.y > 300 && this.player.y < 370) {
      console.log("Jump to world3")
      this.doorSnd.play();
      this.worldc();
     }

     if(this.player.x > 920 && this.player.x < 940 && this.player.y > 600 && this.player.y < 690) {
      console.log("Jump to world4")
      this.doorSnd.play();
      this.worldd();
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


     //control exe//
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

    if (window.key < 3){
      this.unlockSnd.stop();
    } else if (window.key > 2){
      this.unlockSnd.play(1);
    }


    //enemy follow player//
    this.physics.moveToObject(this.hunt, this.player,30,600)

  } 
  /////////////////// end of update //////////////////////////////


  ///world///
  worlda(player, tile) {
    console.log("world5 function");
    this.player.x = 110;
    this.player.y = 355;
    this.scene.start("world",{player: this.player});
  }

  worldb(player, tile) {
    console.log("world6 function");
    this.player.x = 110;
    this.player.y = 610;
    
    this.scene.start("world",{player: this.player});
  }

  worldc(player, tile) {
    console.log("world7 function");
    this.player.x = 915;
    this.player.y = 355;
    this.scene.start("world",{player: this.player});
  }

  worldd(player, tile) {
    console.log("world8 function");
    this.player.x = 915;
    this.player.y = 610;
    this.scene.start("world",{player: this.player});
  }


  ///rooms///
  room5(player, tile) {
    console.log("room5 function");
    this.player.x = 560;
    this.player.y = 287;
    this.scene.start("room5",{player: this.player});
  }
  room6(player, tile) {
    console.log("room6 function");
    this.player.x = 880;
    this.player.y = 290;
    this.scene.start("room6",{player: this.player});
  }

  room7(player, tile) {
    console.log("room7 function");
    this.player.x = 560;
    this.player.y = 685;
    this.scene.start("room7",{player: this.player});
  }

  room8(player, tile) {
    console.log("room8 function");
    this.player.x = 880;
    this.player.y = 688;
    this.scene.start("room8",{player: this.player});
  }


  //death//
  death( player, tile){
    console.log("You died");
    this.scene.start("lose");
    window.key = 0
  }

}
//////////// end of class world ////////////////////////
