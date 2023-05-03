var save_Vue = new Vue({
    el: '#saves_id',
    data: {
      saves: []
    },
    mounted() {
      if (localStorage.getItem('gameState')) {
        try {
          this.saves = JSON.parse(localStorage.getItem('gameState'));
        } catch(e) {
          localStorage.removeItem('gameState');
        }
      }
    },
    methods: {
      saveData() {
        const parsed = JSON.stringify(this.saves);
        localStorage.setItem('gameState', parsed);
      }
    }
  })