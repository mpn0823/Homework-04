"use strict";
(()=>{
    //retrieve score data from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));
    //sort scores from high to low
    scores.sort((a, b) => b.score - a.score)
    var listEl = document.getElementById("list");
    //display top 20 high scores
    for(var i = 0; i < scores.length; i++){
        if(i === 20) break;
        var el = document.createElement("li");
        el.textContent = scores[i].initials + "\t" + formatTime(scores[i].score);
        listEl.appendChild(el);
    }

    //Given time in seconds, returns equivalent value as 
    //a string in MM:SS format
    function formatTime(time){
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if(time <= 0) return "0:00";
        if(seconds < 10) return minutes + ":0" + seconds;
        return minutes + ":" + seconds;
    }





})();