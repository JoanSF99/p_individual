new Vue({
  el: '#saves_id',
  data: {
    saves: []
  },
  created() {
    if (localStorage.getItem('gameState')) {
      try {
        let json = localStorage.getItem('gameState');
        this.saves = JSON.parse(json);
      } catch(e) {
      }
    }
  },
  methods: {
    loadGame(save) {
      let gameStateS = {
        gameMode: save.gameMode,
        dificulty: save.dificulty,
        level: save.level,
        totalScore: save.totalScore,
        username: save.username,
        saved: save.saved,
        gameStarted: save.gameStarted
    };
    localStorage.setItem('gameStateS', JSON.stringify(gameStateS));
    loadpage("../html/game.html");
    }
}
});