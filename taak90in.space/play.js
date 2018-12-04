///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. Start play after 2 new burst with initial amount: 20, index: 1.30.  
// 2. Play until loose 3 times then after 3 loose quit playing.  
// 3. Wait 10 games then until see 2 less than 1.30 then play with compensation amount luckily!.  
// 4. if win, start with initial amount: 20".

//////////////////////////////////////////////////////////////////////////////////////////////////

var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var oldBurst = 666;
var playing = false;
var playingForFirstTime = false;
var winning = true;
var waiting = false;
var initialAmount = 20;
var index = 1.3;
var wantedProfit = [7, 7, 5, 0, 0];
var newEntry = 0;
var looseCount = 0;
var looseCoverCount = 5;
var split = ["", ""];
var interest = 0;
var betAmount = 0;


window.onload = function () {
    console.log("window loaded");

    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

function CheckForNewBurstEveryOneSecond() {
    try {
        newBurst = document.getElementsByClassName("crash-row")[0].children[0].innerHTML;
        console.log(newBurst);
        if (newBurst != "-") {   // New burst added
            
            newEntry++
            if (newEntry === 2) {  // counting new bursts until reach 2 to play for first time
                playing = true;
                playingForFirstTime = true;
            }
            else if (newBurst < oldBurst) {

            }

            // calculate remain interest:
            split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            interest = split[0].concat(split[1]);

            // stop waiting for new burst:
            clearInterval(waitForNewBurst);

            historyOfBursts.push(newBurst);

            // wait 4 second and act:
            setTimeout(WaitForFourSeconds, 4000);

        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
    // finally {
    //     clearInterval(waitForNewBurst);
    // }
}

function WaitForFourSeconds() {
    // After 4 Second passed:
    // Initialize variables:
    if (playing) {        
        if (playingForFirstTime) {    // start playing for first time:
            document.getElementsByClassName("game-amount")[0].value = Math.round((wantedProfit[0] - 0.4) / (index - 1));
            document.getElementsByClassName("cashout-amount")[0].value = index;
            playingForFirstTime = false;
        }
        else if (looseCount === 1) {

        }
        else if (looseCount === 2) {

        }
        else if (looseCount === 3) {

            playing = false;
        }
    }
    
    // activate waiting for new burst again:
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

