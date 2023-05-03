new Vue({
  el: '#ranking_id',
  data: {
    topScores: []
  },
  created() {
    console.log(localStorage.getItem('scores'))
    if (localStorage.getItem('scores')) {
      try {
        let json = localStorage.getItem('scores');
        console.log(json)
        var scores = JSON.parse(json);
        console.log(this.scores)
        this.topScores = scores.slice(0, 5);
        console.log(this.topScores)
      } catch(e) {
        localStorage.removeItem('scores');
      }
    }
  }
})
