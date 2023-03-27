const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: 2,
		bad_clicks: 0,
		gameStarted: false,
		penalty:0
	},
	created: function(){
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
		this.dificulty = options_data.dificulty;
		this.username = sessionStorage.getItem("username","unknown");
		this.items = items.slice(); // Copy the array
		this.items.sort(function(){return Math.random() - 0.5}); // Shuffle the array
		this.num_cards = options_data.cards; // Set num_cards to the value from localStorage
		this.items = this.items.slice(0, this.num_cards); // Take the first numCards elements
		this.items = this.items.concat(this.items); // Duplicate the elements
		this.items.sort(function(){return Math.random() - 0.5}); // Shuffle the array
		for (var i = 0; i < this.num_cards * 2; i++) {
				this.current_card.push({done: false, texture: this.items[i]});
		}

		if(this.dificulty=="hard"){
			Vue.set(this, 'penalty', 25)
			setTimeout(() => {
				this.turnCards();
			}, 1000);
		}
		else if(this.dificulty=="normal"){
			Vue.set(this, 'penalty', 20)
			setTimeout(() => {
				this.turnCards();
			}, 2000);
		}
		else{
			Vue.set(this, 'penalty', 10)
			setTimeout(() => {
				this.turnCards();
			}, 3000);
		}
		
	},
	methods: {
		clickCard: function(i){
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		},
		turnCards: function(){
			Vue.set(this, 'gameStarted', true);
			for (var i = 0; i < this.current_card.length; i++){
				Vue.set(this.current_card, i, {done: false, texture: back});
			}	
		}
	},
	watch: {
		current_card: function(value){
			if (!this.gameStarted) return;
			if (value.texture === back) return;
			var front = null;
			var i_front = -1;
			for (var i = 0; i < this.current_card.length; i++){
				if (!this.current_card[i].done && this.current_card[i].texture !== back){
					if (front){
						if (front.texture === this.current_card[i].texture){
							front.done = this.current_card[i].done = true;
							this.num_cards--;
						}
						else{
							Vue.set(this.current_card, i, {done: false, texture: back});
							Vue.set(this.current_card, i_front, {done: false, texture: back});
							this.bad_clicks++;
							break;
						}
					}
					else{
						front = this.current_card[i];
						i_front = i;
					}
				}
			}			
		}
	},
	computed: {
		score_text: function(){
			return 100 - this.bad_clicks * this.penalty;
		}
	}
});
