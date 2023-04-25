function save_game() {
    let gameScene = game.scene.getScene('game');
    gameScene.saveGame();
	loadpage("../index.html");
}