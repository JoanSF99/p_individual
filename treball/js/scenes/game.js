"use strict"

class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');
        this.cards=null;
        this.firstClick=null;
        this.score=100;
        this.correct=0;
        this.arrayCards=[];
        this.arrayCardsTotal=['co','sb','cb','so','tb','to'];
    }

    preload(){
        this.load.image("back", "../resources/back.png");
        this.load.image("cb", "../resources/cb.png");
        this.load.image("co", "../resources/co.png");
        this.load.image("sb", "../resources/sb.png");
        this.load.image("so", "../resources/so.png");
        this.load.image("tb", "../resources/tb.png");
        this.load.image("to", "../resources/to.png");
    }

    create(){

        var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);

        this.dificulty = options_data.dificulty;
		this.username = sessionStorage.getItem("username","unknown");
		this.arrayCards = this.arrayCardsTotal.slice(); // Copy the array
		this.arrayCards.sort(function(){return Math.random() - 0.5}); // Shuffle the array
		this.num_cards = options_data.cards; // Set num_cards to the value from localStorage
		this.arrayCards = this.arrayCards.slice(0, this.num_cards); // Take the first numCards elements
		this.arrayCards = this.arrayCards.concat(this.arrayCards); // Duplicate the elements
		this.arrayCards.sort(function(){return Math.random() - 0.5}); // Shuffle the array
        this.cards=this.physics.add.staticGroup();

        let cardWidth = 100;
        let totalWidth = this.num_cards * 2 * cardWidth;
        let startX = (1000 - totalWidth) / 2;

        let xPos = startX;
        let yPos = 300;

		for (let i = 0; i < this.num_cards * 2; i++) {
				this.add.image(xPos, yPos, this.arrayCards[i]);
                this.cards.create(xPos,yPos,'back');
                xPos+=100;
		}
        console.log(options_data);

        this.cameras.main.setBackgroundColor(0xBFFCFF);

        let i=0;
        this.cards.children.iterate((card)=>{
            card.card_id=this.arrayCards[i];
            i++;
            card.setInteractive();
            card.on('pointerup',()=>{
                console.log(card);
                card.disableBody(true,true);
                if(this.firstClick){
                    if(this.firstClick.card_id != card.card_id){
                        this.score-=20;
                        this.firstClick.enableBody(false,0,0,true,true);
                        card.enableBody(false,0,0,true,true);
                        if(this.score<=0){
                            alert("Game Over");
                            loadpage("../../index.html");
                        }
                    }
                    else{
                        this.correct++;
                        if(this.correct>=this.num_cards){
                            alert("You win with "+this.score+" points");
                            loadpage("../../index.html");
                        }
                    }
                    this.firstClick=null;
                }
                else{
                    this.firstClick=card;
                }
            },card);
        });
    }
    update(){}
}