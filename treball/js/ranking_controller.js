function getTopScores(count) {
    let scores = JSON.parse(localStorage.getItem('scores') || '[]');
    return scores.slice(0, count);
}

let topScores = getTopScores(5);

let rankingList = document.getElementById('ranking-list');

for (let i = 0; i < topScores.length; i++) {
    let score = topScores[i];
    let scoreItem = document.createElement('li');
    scoreItem.textContent = `${score.name}: ${score.score}`;
    rankingList.appendChild(scoreItem);
}