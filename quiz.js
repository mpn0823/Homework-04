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
    // function generateTestData(arr){
    //     if(arr.length === 10) return;
    //     //create a new question
    //     var q = newQuestion("<question text>");
    //     //add fixed number of answers
    //     for(var i = 0; i < 3; i++){
    //         addAnswer(q, newAnswer("<wrong answer text>", false));
    //     }
    //     addAnswer(q, newAnswer("<right answer text>", true));
    //     shuffleAnswers(q);
    //     arr.push(q);
    //     generateTestData(arr);
    // }

    


    //Render given question object to the page
    //need to rename this functino as it's doing a lot more
    //than just rendering maybe "main game loop"
    function gameLoop(question){
        document.getElementById("answers").innerHTML = "";
        document.getElementById("question").textContent = question.text;
        for(var i = 0; i < question.answers.length; i++){
            let el = document.createElement("div");
            el.textContent = question.answers[i].text;
            el.setAttribute("style", "display: flex; justify-content: center;")
            el.setAttribute("index", i);
            document.getElementById("answers").append(el);
            el.addEventListener("click", function(){
                if(questionArr[currQ].answers[this.getAttribute("index")].isRight === true){}
                    //handle right answer chosen
                else{}
                    //handle wrong answer chosen
                currQ++;
                gameLoop(questionArr[currQ]);
            })
        }
    }
    
    




    var questions = [];   //set of questions
    var currQ = 0;   //current question index
    // console.log(generateTestData());
   
    function foo(arr = []){
        if(arr.length > 10) return arr;
        return foo(arr.concat([1]));
    }
    console.log(foo());






























})();