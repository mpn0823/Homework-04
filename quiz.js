"use strict";
(()=>{
    
    //Returns a new question object
    function newQuestion(text, answers = []){
        var question = {
            text: "",
            answers: [],
        }
        question.text = text;
        question.answers = answers;
        return JSON.parse(JSON.stringify(question));
    }

    //Returns a new answer object
    function newAnswer(text, isRight){
        var answer = {
            text: "",
            isRight: null,
        };
        answer.text = text;
        answer.isRight = isRight;
        return JSON.parse(JSON.stringify(answer));
    }

    //Some useful functions for dealing with question objects.
    function addAnswer(question, answer){ question.answers.push(answer); }
    function shuffleAnswers(question){
        question.answers.sort(function(a, b){return 0.5 - Math.random()});
    }
    
    //Initialize array with randomly generated set of 10 questions with between 2 and 5
    //corresponding answers
    function generateTestData(arr){
        if(arr.length === 10) return;
        //create a new question
        var q = newQuestion("<question text>");
        //add random number of answers
        for(var i = 0; i <= Math.random() * 5; i++){
            addAnswer(q, newAnswer("<wrong answer text>", false));
        }
        addAnswer(q, newAnswer("<right answer text>", true));
        shuffleAnswers(q);
        arr.push(q);
        generateTestData(arr);
    }

    //Render given question object to the page
    function renderQuestion(question){
        document.getElementById("question").textContent = question.text;
        for(var i = 0; i < question.answers.length; i++){
            let el = document.createElement("div");
            el.textContent = question.answers[i].text;
            el.setAttribute("style", "display: flex; justify-content: center;")
            document.getElementById("answers").append(el);
        }
    }
    
    var questionArr = [];
    generateTestData(questionArr);
    console.log(questionArr[0].answers.length);
    renderQuestion(questionArr[0]);

   
   






























})();