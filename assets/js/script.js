var startBtn = document.querySelector("#start-button");
var timeEl = document.querySelector("#time");
var quizEl = document.querySelector("#quiz");
var questionText = document.querySelector("#question-text");
var answerText = document.querySelector("#answers-text");
var scoreText = document.querySelector("#end-game");
var finalScore = document.querySelector("#score");
var submitBtn = document.querySelector("#submit");
var questions = [
    {
    question: "In javascript, the = (equals sign) is actually referred to as the..",
    answers: ['assignment operator', 'equals', 'math equations',],
    correctAnswer: 'assignment operator',
    },
    {
    question: "The Addition Assignment Operator (+=) adds a ______ to a variable.",
    answers: ['number', 'value', 'string'],
    correctAnswer: 'value',
    },
    {
    question: "A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses ().",
    answers: ['true', 'false'],
    correctAnswer: 'true',
    },
    {
    question: 'Functions can contain letters, digits, underscores, and....',
    answers: ['pictures', 'dollar sign', 'neither'],
    correctAnswer: 'dollar sign',
    },
    {
    question: 'If you want to run the same over and over again, with the same value, you would use a ...',
    answers: ['function', 'boolean', 'for loop'],
    correctAnswer: 'for loop',
    },
];
var currentQuestionIdx = 0;
var timeLeft = 60;
//When I click the START button, a timer starts
function startQuiz(){
    var timeInterval =setInterval(function (){
    timeLeft--;
    timeEl.textContent = 'Time: ' + timeLeft;
    if (timeLeft === 0){
    clearInterval(timeInterval);
    endGame();
    }

    }, 1000);

    startBtn.style.display = 'none';
    quizEl.style.display = 'block';
    
    nextQuestion();
}
//Questions are displayed one after another when a user answers
function nextQuestion(){
    answerText.textContent = '';
    var currentQuestion = questions[currentQuestionIdx].question;
    var currentAnswer = questions[currentQuestionIdx].answers;
    questionText.textContent = currentQuestion ;
    for (var i = 0; i < currentAnswer.length; i++){
        var answerBtn = document.createElement('button');
        answerBtn.setAttribute('class', 'answer-text');
        answerBtn.setAttribute('value', currentAnswer[i]);
        answerBtn.textContent = currentAnswer[i];
        answerText.appendChild(answerBtn);
     }
    }
//when the game is over, I can save my initials and my score
function endGame () {
    quizEl.style.display = 'none';
    scoreText.style.display = 'block';
    finalScore.textContent = "Your score is: " + timeLeft;
}
//start button and timer  
startBtn.addEventListener('click', function (e){
    startQuiz();
 });

 answerText.addEventListener('click', function (e){
    var clickedBtn = e.target;
    var clickedBtnValue = e.target.value;

// Time is subtracted when a question is answered incorrectly.
if (clickedBtnValue === questions[currentQuestionIdx].correctAnswer) {
    console.log("correct!");
    currentQuestionIdx++;
    nextQuestion();
} else {
    function subtractTime() {
        timeLeft -= 10;
    }
    subtractTime();
    currentQuestionIdx++;
    nextQuestion();
}
});

//Event listener
submitBtn.addEventListener("click", function (){
    scoreText.style.display = 'none',
    finalScore.textContent = '';
    localStorage.setItem('endScore', timeLeft);
    var displayElement = document.getElementById('display');
    displayElement.style.display = 'block';
});

//add clear and go back buttons