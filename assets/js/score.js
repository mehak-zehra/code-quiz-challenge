//Loading scores from local storage
var loadScores = function() {
    var tbodyEl = document.querySelector("tbody");
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    for(var i = 0; i < highscores.length; i++) {
        var trDataEl = document.createElement("tr");
        var tdNameEl = document.createElement("td");
        tdNameEl.textContent = highscores[i].name;

        var tdScoreEl = document.createElement("td");
        tdScoreEl.textContent = highscores[i].score;

        var tdDateEL = document.createElement("td");
        tdDateEL.textContent = highscores[i].date;

        trDataEl.appendChild(tdNameEl);
        trDataEl.appendChild(tdScoreEl);
        trDataEl.appendChild(tdDateEL);

        tbodyEl.appendChild(trDataEl);
    }
}
loadScores();

//clear all scores from local storage
$("#clear-btn").on("click", function(){
    highscores = [];
    localStorage.setItem("highscores", JSON.stringify(highscores));
    location.reload();

})
