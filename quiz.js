// _                 _      __  __         _   _         _                           _ 
// | |               | |    |  \/  |       | \ | |       | |                         | |
// | |     ___   ___ | | __ | \  / | __ _  |  \| | ___   | |     ___   ___  _ __  ___| |
// | |    / _ \ / _ \| |/ / | |\/| |/ _` | | . ` |/ _ \  | |    / _ \ / _ \| '_ \/ __| |
// | |___| (_) | (_) |   <  | |  | | (_| | | |\  | (_) | | |___| (_) | (_) | |_) \__ \_|
// |______\___/ \___/|_|\_\ |_|  |_|\__,_| |_| \_|\___/  |______\___/ \___/| .__/|___(_)
//                                                                         | |          
//                                                                         |_|          
"use strict";
(() => {
    //Initial game state
    var time;       //time limit in seconds
    var penalty;    //penalty for answering wrong in seconds
    var data;       //array of questions
    var index;      //current question
    var interval;   //reference for timer object

    // localStorage.clear();

    //references to HTML to make following code more concise
    var questionEl = document.getElementById("question");
    var answersEl = document.getElementById("answers");
    var timerEl = document.getElementById("time");
    playGame();
    
    //Returns a set of n questions
    function generateQuestions(n = 10, arr = []) {
        if (arr.length === n) return arr;
        //question object definition
        var question = {
            text: "<question text>",
            answers: generateAnswers(),
        }
        //randomize order of answers
        question.answers.sort((a, b) => { return 0.5 - Math.random() })
        return generateQuestions(n, arr.concat(question));
    }

    //Returns a set of n answers
    function generateAnswers(n = 4, arr = []) {
        //answer object definition
        var answer = {
            text: "",
            isRight: null,
        }
        if (arr.length === n - 1) {
            answer.text = "<right answer text>";
            answer.isRight = true;
            return arr.concat(answer);
        }
        else {
            answer.text = "<wrong answer text>";
            answer.isRight = false;
            return generateAnswers(n, arr.concat(answer));
        }

    }

    //Renders question and corresponding answers to the page
    function renderQuestion(question, i = 0) {
        if (question.answers.length === i) {
            questionEl.textContent = question.text;
            return;
        }
        var el = document.createElement("li");
        el.textContent = question.answers[i].text;
        // el.setAttribute("style", "display: flex; justify-content: center;");
        el.setAttribute("index", i);
        answersEl.appendChild(el);
        renderQuestion(question, ++i);
    }

    //Create event listeners for answers rendered to the page
    function createListeners(i = 0) {
        if (answersEl.children.length === i) return;
        answersEl.children[i].addEventListener("click", function () {
            if (data[index].answers[this.getAttribute("index")].isRight === false) time -= penalty;
            index++;
            if (index === data.length || time <= 0) gameOver();
            else gameStep();
        });
        createListeners(++i);
    }

    //Renders remaining time to the page
    function renderTime() {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if(time <= 0) timerEl.textContent = "0:00";
        else if (seconds < 10) timerEl.textContent = minutes + ":0" + seconds;
        else timerEl.textContent = minutes + ":" + seconds;
    }

    //Move the game forward by advancing to next
    //question and update game state
    function gameStep() {
        answersEl.innerHTML = "";
        renderQuestion(data[index]);
        createListeners();
    }

    //Updates game state after time limit or questions are
    //exhausted
    function gameOver() {
        clearInterval(interval);
        answersEl.innerHTML = "";
        questionEl.textContent = "Game Over";
        var el = document.createElement("li");
        el.textContent = "PLAY AGAIN";
        el.addEventListener("click", ()=>{
            playGame();
        });
        answersEl.appendChild(el);
        saveScore();
        renderHighScores();
    }

    //Starts a new game
    function playGame(){
        //intialize game state
        time = 300;
        penalty = 60;
        data = generateQuestions();
        index = 0;
        answersEl.innerHTML = "";
        var el = document.createElement("li");
        el.textContent = "START";
        el.addEventListener("click", ()=>{
            interval = setInterval(() => {if(time > 0) time--;}, 1000);
            setInterval(() => {renderTime();}, 50);
            gameStep();
        });
        answersEl.appendChild(el);
    }

    
    //Prompts user for initials and saves score to persistent storage
    function saveScore(){
        var scores = JSON.parse(localStorage.getItem("scores"));
        if(scores === null) scores = [];
        var str = prompt("Enter your initials").toUpperCase();
        console.log(str != null);
        if(str != null) scores.push({initials: str, score: time});
        localStorage.setItem("scores", JSON.stringify(scores));
    }

    function logScores(){
        console.log(JSON.parse(localStorage.getItem("scores")));
    }
   
    















})();