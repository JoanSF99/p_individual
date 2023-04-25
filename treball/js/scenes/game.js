"use strict"

class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.totalScore = 0;
        this.correct = 0;
        this.arrayCards = [];
        this.arrayCardsTotal = ['co','sb','cb','so','tb','to'];
        this.level = 1;
        this.showTime = 5000;
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
        var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard","game_mode":"normal"}';
		var options_data = JSON.parse(json);

        console.log(localStorage.getItem("scores"))

        this.dificulty = options_data.dificulty;
        this.gameMode = options_data.game_mode;
		this.username = sessionStorage.getItem("username","unknown");
		this.arrayCards = this.arrayCardsTotal.slice(); // Copy the array
		this.arrayCards.sort(function(){return Math.random() - 0.5}); // Shuffle the array
        if(this.gameMode=="normal"){
            this.num_cards = options_data.cards; // Set num_cards to the value from localStorage
        }
        else{
            this.num_cards = Math.min(4, this.level + 1);
        }
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

        
        this.cards.children.iterate((card) => {
            card.disableBody(true, true);
        });
    
        console.log(this.gameMode)
        if(this.gameMode=="infinite"){
            if(this.dificulty=="easy"){
                setTimeout(() => {
                    this.cards.children.iterate((card) => {
                        card.enableBody(false, 0, 0, true, true);
                    });
                }, 3000);
            }
            else if(this.dificulty=="normal"){
                setTimeout(() => {
                    this.cards.children.iterate((card) => {
                        card.enableBody(false, 0, 0, true, true);
                    });
                }, 2000);
            }
            else if(this.dificulty=="hard"){
                setTimeout(() => {
                    this.cards.children.iterate((card) => {
                        card.enableBody(false, 0, 0, true, true);
                    });
                }, 1000);
            }
        }
        else{ 
            if (this.level>=5){
                setTimeout(() => {
                    this.cards.children.iterate((card) => {
                        card.enableBody(false, 0, 0, true, true);
                    });
                }, 1000);
            }
            else{
                setTimeout(() => {
                    this.cards.children.iterate((card) => {
                        card.enableBody(false, 0, 0, true, true);
                    });
                }, this.showTime);
            }
            
        }    

        this.cameras.main.setBackgroundColor(0xBFFCFF);

        let i=0;
        this.cards.children.iterate((card)=>{
            card.card_id=this.arrayCards[i];
            i++;
            card.setInteractive();
            card.on('pointerup', () => {
                card.disableBody(true, true);
                if (this.firstClick) {
                    if (this.firstClick.card_id != card.card_id) {
                        if (this.gameMode == "normal") {
                            if (this.dificulty == "easy") {
                                this.score -= 10;
                            } else if (this.dificulty == "normal") {
                                this.score -= 20;
                            }
                            if (this.dificulty == "hard") {
                                this.score -= 40;
                            }
                        } else {
                            this.score -= 10 * this.level;
                        }

                        let firstCard = this.firstClick;
                        let secondCard = card;

                        if (this.gameMode == "normal") {
                            if (this.dificulty == "easy") {
                                setTimeout(() => {
                                    firstCard.enableBody(false, 0, 0, true, true);
                                    secondCard.enableBody(false, 0, 0, true, true);
                                }, 1500);
                            } else if (this.dificulty == "normal") {
                                setTimeout(() => {
                                    firstCard.enableBody(false, 0, 0, true, true);
                                    secondCard.enableBody(false, 0, 0, true, true);
                                }, 1000);
                            }
                            if (this.dificulty == "hard") {
                                setTimeout(() => {
                                    firstCard.enableBody(false, 0, 0, true, true);
                                    secondCard.enableBody(false, 0, 0, true, true);
                                }, 500);
                            }
                        } else {
                            if (this.level>=5){
                                setTimeout(() => {
                                    firstCard.enableBody(false, 0, 0, true, true);
                                    secondCard.enableBody(false, 0, 0, true, true);
                                }, 500);
                            }
                            else{
                                setTimeout(() => {
                                    firstCard.enableBody(false, 0, 0, true, true);
                                    secondCard.enableBody(false, 0, 0, true, true);
                                }, 1000);
                            }
                        }
            
                        if (this.score <= 0) {
                            alert("Game Over");
                            let name = sessionStorage.getItem("username");
                            saveScore(name, this.totalScore);
                            loadpage("../../index.html");
                        }

                    } else {
                        this.correct++;
                        if (this.correct >= this.num_cards) {
                            console.log(this.gameMode);
                            if (this.gameMode == "infinite") {
                                this.restartGame();
                            } 
                            else {
                                alert("You win with " + this.score + " points");
                                loadpage("../../index.html");
                            }
                        }
                    }
                    this.firstClick = null;
                } else {
                    this.firstClick = card;
                }
            }, card);                        
        });
    }
    update(){}

    restartGame() {
        this.level++;
        this.num_cards = Math.min(4, this.level + 1);
        this.correct = 0;
        this.totalScore += this.score;
        this.score = 100;
        this.showTime -= 1000;
        this.scene.restart();
    }
}