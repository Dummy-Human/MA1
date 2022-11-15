var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 10,
    height: 32 * 5,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [ intro, intro2, intro3, room1, world2, world, room2, room3, room4, room5, room6, room7, room8]
};


var game = new Phaser.Game(config);

window.icon = 0