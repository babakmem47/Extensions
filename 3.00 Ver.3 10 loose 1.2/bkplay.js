///////////////////////////////////    Strategy    ////////////////////////////////////////////////
// 1. Play with index: 3.00 until loose 10 times in a row.
// 2. After 10th lost, change index: 1.20 and wait until the proper situation.
// 3. play with index: 1.20 two times until win. If win change index to 3.00

//////////////////////////////////////////////////////////////////////////////////////////////////

var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 3.00;
//                    0   1   2   3   4   5   6   7   8   9   10  11 12 13 14 15 
var ExpectedProfit = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 0;
var betAmount = 0;
var loosesSum = 0;
var playingForFirstTime = true;
var waitOutOfGameCount = 0;
var winningStreak = 0;
var looseThreshold = 10;

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
                    winningStreak++;
                    if (loosesCount > looseThreshold) {
                        index = 1.2;
                        playing = false;
                    }
                    
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                    index = 3.00;
                    waitOutOfGameCount = 0;
                }
            }
            else if (!playing) {             // if not play because of: 1.first time  2. loose 10th times   
                if (playingForFirstTime) {
                    if (newEntry >= 1) {  // counting new bursts until reach 2 to play for first time
                        playing = true;
                        playingForFirstTime = false;
                    }
                }
                else if (loosesCount > looseThreshold) {
                    var safe = IsSituationSafe();
                    console.log("safe: ", safe);
                    if (safe) {
                        playing = true;
                    }
                }
                waitOutOfGameCount++;
            }

            //calculate remain interest:   // I comment it because I dont want to play with my all money!
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
            console.log("index: ", index, "  entry: ", newEntry, "  waitOutOfGame: ", waitOutOfGameCount);

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
    if (newEntry > 6) {
        var lastBurst = newBurst;
        var oneBeforeLast = historyOfBursts[historyOfBursts.length - 1];
        var twoBeforeLast = historyOfBursts[historyOfBursts.length - 2];
        var threeBeforeLast = historyOfBursts[historyOfBursts.length - 3];
        var fourBeforeLast = historyOfBursts[historyOfBursts.length - 4];
        var fiveBeforeLast = historyOfBursts[historyOfBursts.length - 5];
        console.log(lastBurst, oneBeforeLast, twoBeforeLast, threeBeforeLast, fourBeforeLast, fiveBeforeLast);
        // play with maximum carefulness
        if (oneBeforeLast > 1.20 && oneBeforeLast < 1.80 && lastBurst > 1.20 && lastBurst < 1.80) {                //  Not play : series of reds  
            console.log("series of 2 big red => Not play");
            return false;
        }
        else if (twoBeforeLast < 1.79 && oneBeforeLast > 1.79 && lastBurst > 1.79) {                              // Not play : red green green
            console.log("red green green => Not play");
            return false;
        }
        else if (twoBeforeLast > 1.79 && oneBeforeLast > 1.20 && oneBeforeLast < 1.79 && lastBurst > 1.79) {      // Not play : green red green
            console.log("green red green => Not play");
            return false;
        }
        else if (lastBurst > 10.00) {                                                                               // Not play : big fat green
            console.log("big fat green => Not play");
            return false;
        }


        // Play
        else if (threeBeforeLast > 1.79 && twoBeforeLast <= 1.40 && oneBeforeLast > 1.79 && lastBurst <= 1.40) {    // PLAY!
            console.log("green <1.4 green <1.4 => PLAY");
            return true;
        }
        else if (threeBeforeLast > 1.79 && twoBeforeLast < 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {  // Play 
            console.log("green red green <1.2 => PLAY");
            return true;
        }

        // else if (fourBeforeLast > 1.79 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
        //     console.log("green green green <1.2 <1.2 => PLAY");
        //     return true;
        // }
        else if (fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("green <1.2 green green <1.2 => PLAY");
            return true;
        }        
        else if (fourBeforeLast <= 1.20 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.40) {
            console.log("<1.2  <1.2 green green <1.3  => PLAY");
            return true;
        }
        // else if (fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
        //     console.log("red red red red green <1.2  => PLAY");
        //     return true;
        // }                
        else if (fiveBeforeLast > 1.79 && fourBeforeLast > 1.79 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("green green green red green <1.2 => PLAY");
            return true;
        }
        else if (fiveBeforeLast > 1.79 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            console.log("green red green red green red => PLAY");
            return true;
        } 
        
        if (waitOutOfGameCount > 20 && loosesCount == looseThreshold + 1) {  // if it is first loose
            if (fourBeforeLast < 1.30 && threeBeforeLast <= 1.30 && twoBeforeLast <= 1.40 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
                console.log("<1.3 <1.3 <1.4 green <1.2 => PLAY");
                return true;
            }
            else if (threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
                console.log("green red green red => PLAY");
                return true;
            }
        }

        
        return false;
    }
    else if (newEntry <= 6) {
        return false;
    }

}