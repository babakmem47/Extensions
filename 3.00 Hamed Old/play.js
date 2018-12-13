///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. play with index 4.00  ExpectedProfit = [100 each round]
// 2. play until loose 8 consecutive round. Then stop playing!

///////////////////////////////////////////////////////////////////////////////////////////////////


var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 3.00;
                //    1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25
//var ExpectedProfit = [10, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
//var ExpectedProfit = [10, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 0;
var betAmount = 0;
var loosesSum = 0;
var playingForFirstTime = true;
var waitOutOfGameCount = 0;
var winningStreak = 0;


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
                    index = 3.00;
                    winningStreak = 0;
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                    winningStreak++;
                    index = 3.00;
                    var oneBeforeNewBurst = historyOfBursts[historyOfBursts.length - 1];
                    console.log("winning streak: ", winningStreak, "one before new burst: ", oneBeforeNewBurst);
                    if (winningStreak == 1) {    // first win
                        if (newBurst < 4.00) {
                            index = 4.00;
                        }
                        else {
                            index = 3.00;
                        }
                    }
                    else if (winningStreak == 2) {  // second win in a row
                        if (oneBeforeNewBurst < 4.00 && newBurst >= 4.00) {
                            index = 5.00;   // interesting!!
                        }
                        else {
                            index = 3.00;
                        }

                    }
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
            console.log("playing: ", playing, "  playingForFirsttime: ", playingForFirstTime);
            console.log("winning streak: ", winningStreak, "  entry: ", newEntry);

            // wait 4 second and act:
            setTimeout(WaitForFourSeconds, 4000);

        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
    
}

function WaitForFourSeconds() {
    // After 4 Second passed:
    // Initialize variables:
    if (playing) {
        document.getElementsByClassName("cashout-amount")[0].value = index;
        document.getElementsByClassName("game-amount")[0].value = betAmount;
        var betButton = document.getElementsByClassName("place-bet")[0];
        betButton.click();
    }

    // activate waiting for new burst again:
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

