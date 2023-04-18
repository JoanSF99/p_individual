class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');
        this.cards=null;
        this.firstClick=null;
        this.score=100;
        this.correct=0;
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
        let arrayCards=['co','sb','co','sb'];
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        this.cards=this.physics.add.staticGroup();

        var xPos = 250;
        var yPos = 300;

        this.add.image(xPos, yPos, arrayCards[0]);
        this.cards.create(xPos,yPos,'back');
        xPos += 100;
        this.add.image(xPos, yPos, arrayCards[1]);
        this.cards.create(xPos,yPos,'back');
        xPos += 100;
        this.add.image(xPos, yPos, arrayCards[2]);
        this.cards.create(xPos,yPos,'back');
        xPos += 100;
        this.add.image(xPos, yPos, arrayCards[3]);
        this.cards.create(xPos,yPos,'back');

        let i=0;
        this.cards.children.iterate((card)=>{
            card.card_id=arrayCards[i];
            i++;
            card.setInteractive();
            card.on('pointerup',()=>{
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
                        if(this.correct>=2){
                            alert("You win with "+this.score+" points");
                            loadpage("../../index.html");
                        }
                    }
                    this,this.firstClick=null;
                }
                else{
                    this.firstClick=card;
                }
            },card);
        });
    }
    update(){}
}