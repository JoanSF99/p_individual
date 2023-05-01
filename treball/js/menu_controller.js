function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
	window.start_game();
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function ranking(){
	loadpage("./html/ranking.html");
}

function load_game() {
    let gameScene = game.scene.getScene('game');
    gameScene.loadGame();
	loadpage("./html/game.html");
}


