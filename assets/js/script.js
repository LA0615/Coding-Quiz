var startBtn = document.querySelector("#start-button");
var timeEl = document.querySelector("#time");
var quizEl = document.querySelector("#quiz");
var questionText = document.querySelector("#question-text");
var answerText = document.querySelector("#answers-text");
var scoreText = document.querySelector("#end-game");
var finalScore = document.querySelector("#score");
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var highscore = document.querySelector("#highscore");
var questions = [
  {
    question:
      "In javascript, the = (equals sign) is actually referred to as the..",
    answers: ["assignment operator", "equals", "math equations"],
    correctAnswer: "assignment operator",
  },
  {
    question:
      "The Addition Assignment Operator (+=) adds a ______ to a variable.",
    answers: ["number", "value", "string"],
    correctAnswer: "value",
  },
  {
    question:
      "A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses ().",
    answers: ["true", "false"],
    correctAnswer: "true",
  },
  {
    question: "Functions can contain letters, digits, underscores, and....",
    answers: ["pictures", "dollar sign", "neither"],
    correctAnswer: "dollar sign",
  },
  {
    question:
      "If you want to run the same over and over again, with the same value, you would use a ...",
    answers: ["function", "boolean", "for loop"],
    correctAnswer: "for loop",
  },
];
var currentQuestionIdx = 0;
var timeLeft = 60;
var timeInterval;
//When I click the START button, a timer starts
function startQuiz() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);

  startBtn.style.display = "none";
  quizEl.style.display = "block";

  nextQuestion();
}
//Questions are displayed one after another when a user answers
function nextQuestion() {
  answerText.textContent = "";

  if (currentQuestionIdx < questions.length) {
    var currentQuestion = questions[currentQuestionIdx].question;
    var currentAnswer = questions[currentQuestionIdx].answers;
    questionText.textContent = currentQuestion;

    for (var i = 0; i < currentAnswer.length; i++) {
      var answerBtn = document.createElement("button");
      answerBtn.setAttribute("class", "answer-text");
      answerBtn.setAttribute("value", currentAnswer[i]);
      answerBtn.textContent = currentAnswer[i];
      answerText.appendChild(answerBtn);
    }
  } else {
    endGame();
  }
}

//start button and timer
startBtn.addEventListener("click", function (e) {
  startQuiz();
});

answerText.addEventListener("click", function (e) {
  var clickedBtn = e.target;
  var clickedBtnValue = clickedBtn.value;

  // Time is subtracted when a question is answered incorrectly.
  if (clickedBtn.tagName === "BUTTON") {
    if (clickedBtnValue === questions[currentQuestionIdx].correctAnswer) {
      console.log("correct!");
      currentQuestionIdx++;
      nextQuestion();
    } else {
      function subtractTime() {
        timeLeft -= 10;
        timeEl.textContent = "Time: " + timeLeft;
      }
      subtractTime();
      currentQuestionIdx++;
      nextQuestion();
    }
  }
});

//when the game is over, I can save my initials and my score
function endGame() {
  clearInterval(timeInterval);
  quizEl.style.display = "none";
  scoreText.style.display = "block";
  finalScore.textContent = "Your score is: " + timeLeft;
}

//Event listener
submitBtn.addEventListener("click", function () {
  (scoreText.style.display = "none"), (finalScore.textContent = "");
  var oldScores = localStorage.getItem("endScore");
  if (oldScores) {
    // [1,2,3] => push 4 => [1,2,3,4]
    oldScores = JSON.parse(oldScores);
    oldScores.push({"initials":initials.value, "score": timeLeft});
  } else {
    var currentScore = {"initials":initials.value, "score": timeLeft};
    oldScores = [currentScore]; // array of one object, first time using the app
  }

  var arrScores = oldScores
  oldScores = JSON.stringify(oldScores)
  localStorage.setItem("endScore", oldScores);


  var displayElement = document.getElementById("display");
  displayElement.style.display = "block";
  highscore.classList.remove("hide");


  // TODO: use your highscore div
  var highscoreDiv = document.getElementById('highscore');
  var strScores = localStorage.getItem("endScore");
  var arrScores = JSON.parse(strScores);
  
  for (var i = 0; i < arrScores.length; i++) {
    var row = document.createElement('div');
    var initials = document.createElement('p');
    var score = document.createElement('p');
  
    initials.textContent = arrScores[i].initials;
    score.textContent = arrScores[i].score;
  
    row.appendChild(initials);
    row.appendChild(score);
  
    highscoreDiv.appendChild(row);
  };


  //var highscore = document.getElementById('highscore');
  var highscore = document.getElementById('highscore');
  for (var i = 0; i < arrScores.length; i++) {
    var initial = document.createElement('p');
    initial.textContent = arrScores[i].initials;
    highscore.appendChild(initial);
  
    var score = document.createElement('p');
    score.textContent = arrScores[i].score;
    highscore.appendChild(score);
  }
});

// Event listener for the clear button
var clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", function () {
    // Clear the input field
    document.querySelector("#initials").value = "";
});