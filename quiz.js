"use strict";
(()=>{
    
    //Returns a new question object
    function newQuestion(text, answers = []){
        var question = {
            text: "",
            answers: [],
            index: 0,
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
    function answerCount(question){ return question.answers.length; }
    
    function addAnswer(question, answer){ question.answers.push([answer]); }
    
    function hasNextAnswer(question){ return question.index < question.answers.length; }
    
    function hasPrevAnswer(question){ return question.index > -1; }
    
    function nextAnswer(question){
        if(question.index != question.answers.length - 1) question.index++;
        return question.answers[question.index];
    }
    
    function prevAnswer(question){
        if(question.index > 0) question.index--;
        return question.answers[question.index];
    }
    
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

    
    var questionArr = [];
    generateTestData(questionArr);
    console.log(questionArr);
    
































})();