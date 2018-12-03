var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var lastBurst = "-";
var playing = false;
var waiting = false;
var initialAmount = 20;
var index = 1.3;


window.onload = function () {
    console.log("window loaded");
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

function CheckForNewBurstEveryOneSecond() {
    try {
        lastBurst = document.getElementsByClassName("crash-row")[0].children[0].innerHTML;
        console.log(lastBurst);
        if (lastBurst != "-") {
            console.log("Now Added: ", lastBurst);
            clearInterval(waitForNewBurst);
            SetVariablesAndMakeDecisions(lastBurst);


            //waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
    // finally {
    //     clearInterval(waitForNewBurst);
    // }
}

function SetVariablesAndMakeDecisions(lastBurst) {
    historyOfBursts.push(lastBurst);
    console.log(historyOfBursts);
    console.log("before 4 second wait");
    setTimeout(WaitForFourSeconds, 4000);
   
    
}

function WaitForFourSeconds() {
    console.log("After 4 second wait");
    document.getElementsByClassName("game-amount")[0].value = initialAmount;
    document.getElementsByClassName("cashout-amount")[0].value = index;
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}