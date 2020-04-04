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
    
    




   




























})();