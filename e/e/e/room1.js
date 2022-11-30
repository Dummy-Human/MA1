class room1 extends Phaser.Scene {
  constructor() {
    super({
      key: "room1",
    });
  }


init (data){
  this.player = data.player
  this.inventory = data.inventory
}


  preload() {
    //JSON//
    this.load.tilemapTiledJSON("room1", "assets/room1.tmj");


    


    //image load//
    this.load.image("classimg", "assets/class.png");
    this.load.image("gramimg", "assets/gram.png");
    this.load.image("groundimg", "assets/ground.png");
    this.load.image("lockerimg", "assets/lockers.png");
    this.load.image("windowimg", "assets/window.png");
    //tint//
    this.load.image("tint", "assets/tint.jpg")

    //sound//
    this.load.audio("door", "assets/door.mp3");
    this.load.audio("key", "assets/key.mp3");
    

    //tint//
    this.load.image("tint", "assets/tint.jpg", {frameHeight: 100, frameWidth: 100})


    //character//
    this.load.spritesheet('taki', 'assets/characterSprite.png', { frameWidth: 32, frameHeight: 32});
  }

  create() {
    console.log("*** world scene");


    //sound//
    this.doorSnd = this.sound.add("door")


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



    //character//
    this.player = this.physics.add.sprite(this.player.x, this.player.y, 'taki').setScale(1.5);
    this.player.body.setSize (this.player.width * 0.5, this.player.height * 0.8, true);
    window.player = this.player;

    //tint//
    const image = this.add.image(0, 0, 'tint').setScale(1000);
    image.setAlpha(0.6);


    //adding collision//
    this.wallLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    

    //collision//
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.furnitureLayer, this.player);
    
    

    //control call//
    this.cursors = this.input.keyboard.createCursorKeys();

    //camera//
    this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {
    //world//
    if(this.player.x > 549 && this.player.x < 569 && this.player.y > 260 && this.player.y < 269 ) {
      console.log("Jump to world")
      this.doorSnd.play();
      this.world();
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
  } 
  /////////////////// end of update //////////////////////////////

  
  world(player, tile) {
    console.log("world function");
    this.player.x = 270;
    this.player.y = 360;
    this.scene.start("world",{player: this.player});
  }
} //////////// end of class world ////////////////////////
