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
var start = document.querySelector(".start");

var remTime = wareHouse.length * 9.9;
var q = 0;
var s = 0;
var score = 0;
var scoreTab = [];
var timeInterval;

getScore();

function timer() {
    timeInterval = setInterval(function () {
        remTime--;
        timeLeft.textContent = "You have now " + remTime + " seconds left!!";
        if (remTime == 0 || q >= wareHouse.length) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}
function questionShow() {
    if (q < wareHouse.length) {
        question.textContent = wareHouse[q].question;
        choiceA.textContent = wareHouse[q].selection[0];
        choiceB.textContent = wareHouse[q].selection[1];
        choiceC.textContent = wareHouse[q].selection[2];
        choiceD.textContent = wareHouse[q].selection[3];
    } else {
        gameOver();
    }
}

function riOwro(event) {
    if (q >= wareHouse.length) {
        gameOver();
        clearInterval(timeInterval);
    } else {
        if (event === wareHouse[q].answer) {
            remTime += 9;
            feedback.textContent = "nice";
        } else {
            remTime -= 11;
            feedback.textContent = "F";
        }
        score = remTime;
        q++;
        questionShow();
    }
}

function getScore() {
    var recordScore = JSON.parse(localStorage.getItem("highestScore"));
    if (recordScore !== null) {
        scoreTab = recordScore;
    }
}

function saveScore() {
    localStorage.setItem("highestScore", JSON.stringify(scoreTab));
}

function gameOver() {
    scoreBtn.innerHTML = score;
    scoreBtn.style.display = "inline-block";
    mainGame.classList.add("hide");
    inputForm.classList.remove("hide");
    timeLeft.classList.add("hide");
    highButton.classList.add("hide");
    scoreBoard();
}

function scoreBoard() {
    addScore();
    scoreTab.sort((x, y) => {
        return y.score - x.score;
    });
    topScore = scoreTab.slice(0,100);
    for (var i = 0; i < topScore.length; i++) {
        var player = topScore[i].player;
        var score = topScore[i].score;
        var newScore = document.createElement("nav");
        scoreBB.appendChild(newScore);
        var newLabel = document.createElement("label");
        newLabel.textContent = player + " :" + score;
        newScore.appendChild(newLabel); 
    }
}

function addScore() {
    scoreBB = document.createElement("nav");
    scoreBB.setAttribute("id", "playerName");
    document.getElementById("scoreBoard").appendChild(scoreBB);
}

startQuiz.addEventListener("click", function(event) {
    timer();
    questionShow();
        start.classList.add("hide");
        mainGame.classList.remove("hide");
        highButton.style.display = "none";
        scores.classList.add("hide");
});

card.addEventListener("click", function(event) {
    var event = event.target;
    riOwro(event.textContent.trim());
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var playerName = initials.value.trim();
    var newRecord = {
        player: playerName,
        score: score,
    };
    scoreTab.push(newRecord);
    saveScore();
    scoreBoard();
    inputForm.classList.add("hide");
    scores.classList.remove("hide");
});

highButton.addEventListener("click", function(event) {
    scores.classList.add("hide");
    highButton.classList.add("hide");
    start.classList.remove("hide");
})

back.addEventListener("click", function(event) {
    location.reload();
});
