new Vue({
    el: '#ranking_id',
    data: {
      topScores: []
    },
    mounted() {
        console.log(localStorage.getItem('scores'))

      if (localStorage.getItem('scores')) {
        try {
          let json = localStorage.getItem('scores');
          var sacores = JSON.parse(json);
          console.log(this.scores)
          this.topScores = scores.slice(0, 5);
        } catch(e) {
          localStorage.removeItem('scores');
        }
      }
      console.log(this.topScores)
    }
  })