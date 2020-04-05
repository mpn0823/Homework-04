"use strict";
(()=>{
     //Returns a set of n questions
     function generateQuestions(n = 10, arr = []){
        if(arr.length === n) return arr;
        //question object definition
        var question = {
            text: "<question text>",
            answers: generateAnswers(),
        }
        //randomize order of answers
        question.answers.sort((a, b)=>{return 0.5 - Math.random()})
        return generateQuestions(n, arr.concat(question));
    }

    //Returns a set of n answers
    function generateAnswers(n = 4, arr = []){
        //answer object definition
        var answer = {
            text: "",
            isRight: null,
        }
        if(arr.length === n -1){
            answer.text = "<right answer text>";
            answer.isRight = true;
            return arr.concat(answer);
        }
        else{
            answer.text = "<wrong answer text>";
            answer.isRight = false;
            return generateAnswers(n, arr.concat(answer));
        }

    }
   
    //Renders question and corresponding answers to the page
    function renderQuestion(question, i = 0){
        if(question.answers.length === i){
            document.getElementById("question").textContent = question.text;
            return;
        }
        var el = document.createElement("div");
        el.textContent = question.answers[i].text;
        el.setAttribute("style", "display: flex; justify-content: center;");
        el.setAttribute("index", i);
        document.getElementById("answers").appendChild(el);
        renderQuestion(question, ++i);
    }

    //Create event listeners for answers rendered to the page
    function createListeners(i = 0){
       if(document.getElementById("answers").children.length === i) return;
       document.getElementById("answers").children[i].addEventListener("click", function(){
           
       });
       createListeners(++i);
    }

    renderQuestion(generateQuestions()[0]);
    createListeners();

    var time = 600;
    setInterval(() => {
        renderTime();
        time--;
    }, 1000);

    function renderTime(){
        var minutes = Math.floor(time/60);
        var seconds = time % 60;
        if(seconds < 10) document.getElementById("time").textContent = minutes + ":0" + seconds;
        else document.getElementById("time").textContent = minutes + ":" + seconds;
    }

    
























})();