new Vue({
  el: '#ranking_id',
  data: {
    topScores: []
  },
  created() {
    if (localStorage.getItem('scores')) {
      try {
        let json = localStorage.getItem('scores');
        var scores = JSON.parse(json);
        this.topScores = scores.slice(0, 5);
      } catch(e) {
      }
    }
  }
})