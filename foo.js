(()=>{
    "use strict";

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
    console.log(generateQuestions());




})();