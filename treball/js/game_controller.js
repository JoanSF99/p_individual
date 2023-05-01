"use strict";

let game; // Define the game variable at the top level

function start_game() {
    // Create a new Phaser game instance and assign it to the game variable
    game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1000,
        height: 600,
        parent: 'game_area',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [GameScene]
    });
}

