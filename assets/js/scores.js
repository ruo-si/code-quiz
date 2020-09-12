var clearElement = document.querySelector("#clear");
var highScoresElement = document.querySelector("#high-scores")
var scores = JSON.parse(localStorage.getItem("highScores"))



function printHighscores() {
  // (optional) sort highscores by score property in descending order

  // either get scores from localstorage or set to empty array
  if (scores === null) {
    return;
  }
  else {

    // for each score
    for (var i = 0; i < scores.length; i++) {
      var newScore = scores[i];
      
      // create li tag for each high score
      var scoreLi = document.createElement("li");
      scoreLi.textContent = score;

      // display on page
      highScoresElement.appendChild(scoreLi)
    }
  };
}

function clearHighscores(event) {

  event.preventDefault();

if (scores === null) {
  return;
}
else {
  highScoresElement.innerHTML = "";
  scores.forEach(function (element) {
    element.textContent = "";
  })

  // clear local storage/ saved score
  localStorage.clear();

  //reload page
  document.reload();
};
};

// attach clear event to clear score button
clearElement.addEventListener("click", clearHighscores);

// run printhighscore when page loads
printHighscores()
