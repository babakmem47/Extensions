///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. play with index 4.00  ExpectedProfit = [100 each round]
// 2. play until loose 8 consecutive round. Then stop playing!

///////////////////////////////////////////////////////////////////////////////////////////////////


var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 4.00;
                //    1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25
var ExpectedProfit = [10, 10, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 0;
var betAmount = 0;
var loosesSum = 0;
var playingForFirstTime = true;
var waitOutOfGameCount = 0;


window.onload = function () {
    console.log("window loaded");

    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

function CheckForNewBurstEveryOneSecond() {
    try {
        newBurst = document.getElementsByClassName("crash-row")[0].children[0].innerHTML;
        console.log(newBurst);
        if (newBurst != "-") {   // New burst added

            // stop waiting for new burst(for now!):
            clearInterval(waitForNewBurst);

            newEntry++;
            if (playing) {
                if (newBurst < index) {   // loosing when playing: calculate loose count
                    loosesCount++;
                    loosesSum = betAmount + loosesSum;
                    // if (loosesCount >= 8) {
                    //     //index = 4.00;
                    //     playing = false;
                    //     waitOutOfGameCount++;
                    // }
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                    //index = 4.00;
                    waitOutOfGameCount = 0;
                }
            }
            else if (!playing) {             // if not play because of: 1.first time  2. loose 8th times in a row         
                if (playingForFirstTime) {
                    if (newEntry >= 2) {  // counting new bursts until reach 2 to play for first time
                        playing = true;
                        //index = 4.00;
                        playingForFirstTime = false;
                    }
                }
                else if (loosesCount >= 2) {
                    var safe = IsSituationSafe();
                    console.log("safe: ", safe);
                    if (safe) {
                        playing = true;
                    }
                }
                waitOutOfGameCount++;
            }

            //calculate remain interest: 
            split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            interest = split[0].concat(split[1]);


            historyOfBursts.push(newBurst);

            ////// increase profit (if possible) depend on interest grow ///////////////////////
            // console.log(ExpectedProfit);
            // ExpectedProfit[0]++;
            // console.log(ExpectedProfit);
            // var sum = 0;
            // for (var i = 0; i < ExpectedProfit.length; i++) {
            //     sum += Math.round(((ExpectedProfit[i] + sum) - 0.4) / (index - 1));
            // }
            // console.log("sum: ", sum);
            // if (sum < interest) {
            //     // successfully increase ExpectedProfit!!  because interest is enough
            // }
            // else {
            //     ExpectedProfit[0]--;    // interest is not enough. So rollback to previous value;
            // }
            ////////////////////////////////////////////////////////////////////////////////////

            // console.log(ExpectedProfit);
            betAmount = Math.round(((ExpectedProfit[loosesCount] + loosesSum) - 0.4) / (index - 1));
            console.log("looseCount: ", loosesCount, "  looseSum: ", loosesSum, "   betAmount: ", betAmount, "  interest: ", interest);
            console.log("playing: ", playing, "  greenLight: ", playingForFirstTime);
            console.log("playingForFirsttime: ", playingForFirstTime, "  entry: ", newEntry, "  waitOutOfGame: ", waitOutOfGameCount);

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
        document.getElementsByClassName("cashout-amount")[0].value = index;
        document.getElementsByClassName("game-amount")[0].value = betAmount;
        var betButton = document.getElementsByClassName("place-bet")[0];
        betButton.click();
        // console.log("click!");
    }

    // activate waiting for new burst again:
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

function IsSituationSafe() {
    var allIsLessThanFour = true;
    for (var i = historyOfBursts.length - 5; i < historyOfBursts.length; i++) {
        if (historyOfBursts[i] < 4.00) {
            allIsLessThanFour =  false;
        }        
    }
    return allIsLessThanFour;
}