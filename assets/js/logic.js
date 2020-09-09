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
        console.log("wrong!");

        // penalize time
        secondsLeft = secondsLeft -5;

        // display new time on page
        time.textContent = secondsLeft;

        // play "wrong" sound effect
        sfxWrong.play();

        // flash wrong feedback on page for half a second
        setTimeout(function () { alert("wrong!") }, 500);
    }

    // else
    else {
        console.log("correct!")
        // play "right" sound effect
        sfxRight.play();

        // flash right feedback on page for half a second
        setTimeout(function () { alert("correct") }, 500);
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

    // show end screen
    var endScreenElement = document.querySelector("#end-screen")
    endScreenElement.setAttribute("class", "");

    // show final score
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time
    var timeInterval = setInterval(
        function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft;

            // check if user ran out of time
            if (secondsLeft === 0) {
                clearInterval(timeInterval, 1000)
            }
            // console.log("interval");

        }, 1000
    )
}

function saveHighscore() {
    // get value of input box
    // make sure value wasn't empty
    // get saved scores from localstorage, or if not any, set to empty array
    // format new score object for current user
    // save to localstorage
    // redirect to next page
}

function checkForEnter(event) {
    // check if event key is enter
    // saveHighscore
}

// user clicks button to submit initials
// submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

    // initialsEl.onkeyup = checkForEnter;
