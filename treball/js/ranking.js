"use strict"

function saveScore(name,score) {
    let scores = JSON.parse(localStorage.getItem('scores') || '[]');
    let newScore = { name: name, score: score };
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('scores', JSON.stringify(scores));
}
