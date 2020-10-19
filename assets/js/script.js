// Vairables are declared here for timer, score, questions, and local storagex
let i = 0;
let score = 0;
let timeClock = 99;
const timer = document.querySelector("#time");
const newMessage = document.querySelector("#message");
let localScores;
let scoreList = [];
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");
// Timer and Time up prompt
function setTime() {
    var timeInterval = setInterval(function () {
        timeClock--;
        timer.textContent = "Timer " + timeClock;
        if (newTime === 0) {
            clearInterval(timeInterval);
            alert("Time!");
            questionEnder();
        }
        else if (i === questions.length) {
            clearInterval(timeInterval);
        }
    }, 1000)
    return (score)
};
// When time is up or user has answered all the questions, display the score and prompt to user to submit their name in HighScore or Play again.
function questionEnder() {
    const inputScore = document.createElement("h1");
    const inputTag = document.createElement("input");
    const submitButton = document.createElement("button");
    const playAgainButton = document.createElement("button");
    score += timeClock;
    if (score <= 0 ) {
        score = 0;
    };
    document.getElementById("question").textContent = "Game Over!";
    choiceA.remove();
    choiceB.remove();
    choiceC.remove();
    choiceD.remove();
    document.body.children[1].appendChild(inputScore);
    document.getElementsByTagName("h1")[0].setAttribute("id", "score");
    document.getElementById("score").textContent = "Your Score is " + score;
    document.getElementById("score").setAttribute("class", "row");
    document.getElementById("score").setAttribute("class", "text-center");
    document.body.children[1].appendChild(inputTag);
    document.getElementsByTagName("input")[0].setAttribute("id", "input-field");
    document.getElementsByTagName("input")[0].placeholder = "Enter initials";
    submitButton.textContent = "Submit";
    document.body.children[1].appendChild(submitButton);    
    submitButton.addEventListener("click", function (event) {    
        event.preventDefault();     
        var hiScoreText = new Object();   
        hiScoreText.name = inputTag.value.trim(); 
        hiScoreText.newScore = score;     
        saveScores(hiScoreText);   
        window.location.href = "index.html";    
    });  
};

//Displays questions
function questionInit() {
    choiceA.hidden = false;
    choiceB.hidden = false;
    choiceC.hidden = false;
    choiceD.hidden = false;
    document.getElementById("startButton").hidden = true;
    if (i === questions.length) {
        questionEnder();
    }
    else {
        document.getElementById("question").textContent = questions[i]["title"];
        document.getElementById("choiceA").textContent = questions[i]["choices"][0];
        document.getElementById("choiceB").textContent = questions[i]["choices"][1];
        document.getElementById("choiceC").textContent = questions[i]["choices"][2];
        document.getElementById("choiceD").textContent = questions[i]["choices"][3];
    }
};
// Local Storage - Need to verify functionality
function saveScores(hiScoreText) {
    tempArray = JSON.parse(localStorage.getItem("scores"));
    if (tempArray === null) {
        scoreList.push(hiScoreText);
        localStorage.setItem("scores", JSON.stringify(scoreList));
    }
    else {
        tempArray.push(hiScoreText);
        localStorage.setItem("scores", JSON.stringify(tempArray));
    }
};
document.getElementById("startButton").addEventListener("click", questionInit);
document.getElementById("startButton").addEventListener("click", setTime);
document.getElementById("startButton").addEventListener("click", function () {
    newMessage.textContent = "";
});
// Show correct or wrong and subtracts time
choiceA.hidden = true;
choiceB.hidden = true;
choiceC.hidden = true;
choiceD.hidden = true;
document.getElementById("choiceA").addEventListener("click", function () {
    if (questions[i]["choices"][0] === questions[i]["answer"]) {
        newMessage.textContent = "Well done!";
        score++;
    }
    else {
        newMessage.textContent = "Incorrect!";
        timeClock -= 5;
    }
    i++;
    questionInit();
});
document.getElementById("choiceB").addEventListener("click", function () {
    if (questions[i]["choices"][1] === questions[i]["answer"]) {
        newMessage.textContent = "Ding Ding Ding Ding!";
        score++;
    }
    else {
        newMessage.textContent = "Nope!";
        timeClock -= 5;
    }
    i++;
    questionInit();
});
document.getElementById("choiceC").addEventListener("click", function () {
    if (questions[i]["choices"][2] === questions[i]["answer"]) {
        newMessage.textContent = "Indubitably!";
        score++;
    }
    else {
        newMessage.textContent = "Are you ANY good at this game?";
        timeClock -= 5;
    }
    i++;
    questionInit();
});
document.getElementById("choiceD").addEventListener("click", function () {
    if (questions[i]["choices"][3] === questions[i]["answer"]) {
        newMessage.textContent = "You are right";
        score++;
    }
    else {
        newMessage.textContent = "C'mon! You can do better than that!";
        timeClock -= 5;
    }
    i++;
    questionInit();
});
