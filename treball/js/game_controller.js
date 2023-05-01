"use strict";

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
	parent: 'game_area',
	physics:{
		default: 'arcade',
		arcade: {
			gavity: {y:0},
			debug: false
		}
	},
    scene: [GameScene]
};

var game = new Phaser.Game(config);
