var startQuiz = document.querySelector("#startButton");
var highButton = document.querySelector("#highscores");
var timeLeft = document.querySelector(".timeLeft");

var mainGame = document.querySelector("#mainGame");
var question = document.querySelector("#question");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var answer = document.querySelector('#answer');
var feedback = document.querySelector('#responseRe');
var card = document.querySelector('#questionHeader');

var inputForm = document.querySelector('#inputForm');
var scores = document.querySelector('#scores');
var scoreBtn = document.querySelector('#scoreBtn');
var initials = document.querySelector('#namePlay');
var submitBtn = document.querySelector('#submitBtn');
var back = document.querySelector('#backButton');

var remTime = wareHouse.length * 15;
var q = 0;
var s = 0;
var score = 0;
var scoreTab = [];
var timeInterval;

getScore();

function timer() {
    timeInterval = setInterval(function () {
        remLeft--;
        timerDisplay.textContent = "You have now " + remTime + " left!!";
        if (remTime == 0 || q>= wareHouse.length) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

