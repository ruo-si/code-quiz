// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var secondsLeft = time


// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
    var startScreenElement = document.querySelector("#start-screen");

    // hide start screen
    startScreenElement.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.setAttribute("class", "");

    // start timer
    clockTick();

    // show starting time
    timerEl.textContent = time
    localStorage.setItem("time", time)

    // show feedback
    feedbackEl.setAttribute("class", "feedback");

    getQuestion();
}

function getQuestion() {
    var questionTitleEl = document.querySelector("#question-title")

    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex].title;


    // update title with current question
    questionTitleEl.textContent = currentQuestion;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    var choicesArray = questions[currentQuestionIndex].choices;

    for (i = 0; i < choicesArray.length; i++) {
        var choice = choicesArray[i];
        var answerButton = document.createElement("button");

        answerButton.setAttribute("data-id", questions[currentQuestionIndex].answer);
        // create new button for each choice
        answerButton.textContent = choicesArray[i];

        // display on the page
        choicesEl.appendChild(answerButton);

        // attach click event listener to each choice
        answerButton.addEventListener("click", questionClick)
    }
}

function questionClick(event) {
    // console.log(event.target.getAttribute("data-id"));
    // console.log(event.target.textContent);
    var correctAnswer = event.target.getAttribute("data-id");
    var inputAnswer = event.target.textContent;

    // check if user guessed wrong
    if (correctAnswer !== inputAnswer) {
        // console.log("wrong!");

        // penalize time
        secondsLeft = secondsLeft - 5;

        // display new time on page
        time.textContent = secondsLeft;

        // play "wrong" sound effect
        sfxWrong.play();

         // flash wrong feedback on page for half a second
         setTimeout(function () {

            //  alert("correct")
            feedbackEl.textContent = "wrong!";

        }, 500);

    }

    // else
    else {
        // console.log("correct!")
        // play "right" sound effect
        sfxRight.play();

        // flash right feedback on page for half a second
        setTimeout(function () {

            //  alert("correct")
            feedbackEl.textContent = "correct!";

        }, 500);

    };


    // check if we've run out of questions
    if (currentQuestionIndex < questions.length) {

        // move to next question
        currentQuestionIndex++;
        getQuestion();
    }
    else {
        // quizEnd
        quizEnd()
    };
}

function quizEnd() {
    // stop timer
    // clearInterval(timeInterval)
    // show end screen
    var endScreenElement = document.querySelector("#end-screen")
    endScreenElement.setAttribute("class", "");

    // show final score


    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time

    if (secondsLeft > 0) {
        var timeInterval = setInterval(
            function () {

                secondsLeft--;
                timerEl.textContent = secondsLeft;
            }, 1000);

        // check if user ran out of time

        // function stopTimer() {

    }
    else {
        // var secondsLeft = secondsLeft;
        quizEnd();

    }

}

function saveHighscore(event) {

    event.preventDefault();

    // get value of input box
    var userInitialsInput = initialsEl.value.trim();

    // make sure value wasn't empty
    if (userInitialsInput === "") {
        alert("Please enter your initials!");
    }
    else {
        // get saved scores from localstorage, or if not any, set to empty array
        var parsedScores = JSON.parse(localStorage.getItem("highScores"));

        if (parsedScores === null) {
            parsedScores = [];
        }
        else {

            // format new score object for current user
            var newInput = { userInitialsInput: secondsLeft };
            parsedScores.push(newInput);

            // save to localstorage
            var stringifiedScores = JASON.stringify(parsedScores);

            localStorage.setItem("highScore", stringifiedScores);

            // redirect to next page
            window.location = href("highscores.html");
        }

    }

}

function checkForEnter(event) {
console.log(event);

    // check if event key is enter
    var key = event.key.toLowerCase();
    key.includes("enter");

    // saveHighscore
    saveHighscore();
}

// user clicks button to submit initials
// submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// initialsEl.onkeyup = checkForEnter


