
//return
// var returnEl = document.querySelector("#return-btn");
//clear
// var clearEl = document.querySelector("#clear-btn");
var rowEl = document.querySelector(".row");



{/* <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>>
  </tbody>
</table> */}
var loadScore = function(){
    var tableEl = document.createElement("table");
    tableEl.className= "table"
    var tableHeadEl = document.createElement("thead");
    tableHeadEl.className = "thead-dark"
    var trEl = document.createElement("tr");

    var thNameEl = document.createElement("th");
    thNameEl.scope = "col";
    thNameEl.textContent = "NAME";

    var thScoreEl = document.createElement("th");
    thScoreEl.scope = "col";
    thScoreEl.textContent = "SCORE";

    trEl.appendChild(thNameEl);
    trEl.appendChild(thScoreEl);

    tableHeadEl.appendChild(trEl);
    tableEl.appendChild(tableHeadEl);

    var tbodayEl = document.createElement("tbody");
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    for(var i = 0; i < highscores.length; i++) {
        var trDataEl = document.createElement("tr");
        var tdNameEl = document.createElement("td");
        tdNameEl.textContent = highscores[i].name;

        var tdScoreEl = document.createElement("td");
        tdScoreEl.textContent = highscores[i].score;

        trDataEl.appendChild(tdNameEl);
        trDataEl.appendChild(tdScoreEl);

        tbodayEl.appendChild(trDataEl);
    }
    tableEl.appendChild(tbodayEl);
    rowEl.appendChild(tableEl);
    
}
// loadScore();