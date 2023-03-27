var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("back", "../resources/back.png")
	this.load.image("cb", "../resources/cb.png")
	this.load.image("co", "../resources/co.png")
	this.load.image("sb", "../resources/sb.png")
	this.load.image("so", "../resources/so.png")
	this.load.image("tb", "../resources/tb.png")
	this.load.image("to", "../resources/to.png")
}

function create() {
    // Creación de objetos del juego
}

function update() {
    // Actualización del juego
}
