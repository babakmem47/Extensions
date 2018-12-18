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
//                    0  1  2  3  4  5  6  7  8  9 10  11 12 13 14 15 
//var ExpectedProfit = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
//                    0   1   2   3   4   5   6   7   8   9   10  11 12 13 14 15 
var ExpectedProfit = [15, 15, 15, 15, 15, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
var currentNecessaryAmount = MustHaveAfterAllLooses(ExpectedProfit);
var nextProfitArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var nextNecessaryAmount = 0;
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

            //calculate remain interest:   // I comment it because I dont want to play with my all money!
            split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            interest = split[0].concat(split[1]);


            
            newEntry++;
            if (playing) {
                if (newBurst < index) {   // loosing when playing: calculate loose count
                    loosesCount++;
                    loosesSum = betAmount + loosesSum;
                    if (IsSituationSafe()) {
                        index = 1.2;
                        console.log("situaltion safe!");
                        situationIsSafe = true;
                    }
                    else {
                        index = 3.00;
                    }
                    if (loosesCount > looseThreshold) {
                        index = 1.2;
                        playing = false;
                    }
                    
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                    if (IsSituationSafe()) {
                        index = 1.2;
                        console.log("situaltion safe!");
                        situationIsSafe = true;
                    }
                    else {
                        index = 3.00;
                    }
                    waitOutOfGameCount = 0;
                    if (interest > nextNecessaryAmount) {    // if interest be enough to increase profit
                        for (var i = 0; i < ExpectedProfit.length; i++) {
                            ExpectedProfit[i] = nextProfitArray[i];
                        }
                        CalculateNextExpectedProfitAndNextNecessaryAmount();
                        console.log("Next Profit Array: ", nextProfitArray);
                        console.log("Next Necessary Amount: ", nextNecessaryAmount);
                    }
                }
            }
            else if (!playing) {             // if not play because of: 1.first time  2. loose 10th times   
                if (playingForFirstTime) {
                    if (newEntry >= 1) {  // counting new bursts until reach 2 to play for first time
                        playing = true;
                        playingForFirstTime = false;
                        // calculate next necessary amount
                        for (var i = 0; i < ExpectedProfit.length; i++) {
                            nextProfitArray[i] = ExpectedProfit[i];
                        }
                        console.log("initialize next profit array: ", nextProfitArray);
                        CalculateNextExpectedProfitAndNextNecessaryAmount();
                        console.log("after calculate => profit array: ", nextProfitArray);
                        console.log("after calculate => next necessary amount: ", nextNecessaryAmount);
                        
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

            
            historyOfBursts.push(newBurst);

          
            betAmount = Math.round(((ExpectedProfit[loosesCount] + loosesSum) - 0.4) / (index - 1));
            console.log("looseCount: ", loosesCount, "  looseSum: ", loosesSum, "   betAmount: ", betAmount, "  interest: ", interest, "  nextAmount: ", nextNecessaryAmount);
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
        var sixBeforeLast = historyOfBursts[historyOfBursts.length - 6];
        var sevenBeforeLast = historyOfBursts[historyOfBursts.length - 7];
        var eightBeforeLast = historyOfBursts[historyOfBursts.length - 7];
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
        
        else if (sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green red green => PLAY");
            return true;
        }  
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green green red green => PLAY");
            return true;
        } 
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green red red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast > 1.79 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green green green red green => PLAY");
            return true;
        } 
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("5*red green red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("5*red green green red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("6*red green red green => PLAY");
            return true;
        } 
        else if (fourBeforeLast < 1.20 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("<1.2 green green <1.2 <1.2 => PLAY");
            return true;
        }
        // else if (fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
        //     console.log("green <1.2 green green <1.2 => PLAY");
        //     return true;
        // }        
        else if (fourBeforeLast <= 1.20 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.40) {
            console.log("<1.2  <1.2 green green <1.3  => PLAY");
            return true;
        }
        else if (fourBeforeLast <= 1.20 && threeBeforeLast <= 1.20 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("<1.2 <1.2 <1.2 green <1.2  => PLAY");
            return true;
        }                
        
        else if (fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast <= 1.20 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("red red <1.2 <1.2 <1.2 => PLAY");
            return true;
        }

        else if (fiveBeforeLast > 1.79 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            console.log("green red green red green red => PLAY");
            return true;
        } 
        
        if (waitOutOfGameCount > 20 && loosesCount == looseThreshold + 1) {  // if it is first loose
            // if (fourBeforeLast < 1.30 && threeBeforeLast <= 1.30 && twoBeforeLast <= 1.40 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            //     console.log("<1.3 <1.3 <1.4 green <1.2 => PLAY");
            //     return true;
            // }
            if (fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
                console.log("red green red green red => PLAY");
                return true;
            } 
            // else if (threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            //     console.log("green red green red => PLAY");
            //     return true;
            // }
        }
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
        
        else if (sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green red green => PLAY");
            return true;
        }  
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green green red green => PLAY");
            return true;
        } 
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green red red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast > 1.79 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("4*red green green green red green => PLAY");
            return true;
        } 
        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("5*red green red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("5*red green green red green => PLAY");
            return true;
        } 
        else if (eightBeforeLast < 1.80 && sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast > 1.79 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("6*red green red green => PLAY");
            return true;
        } 

        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {
            console.log("6*red green red => PLAY");
            return true;
        }

        else if (sevenBeforeLast < 1.80 && sixBeforeLast < 1.80 && fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast < 1.80 && oneBeforeLast < 1.80 && lastBurst > 1.79) {
            console.log("7*red green => PLAY");
            return true;
        }

        else if (fourBeforeLast < 1.20 && threeBeforeLast > 1.79 && twoBeforeLast > 1.79 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("<1.2 green green <1.2 <1.2 => PLAY");
            return true;
        }
        else if (fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("green <1.2 green green <1.2 => PLAY");
            return true;
        }        
        else if (fourBeforeLast <= 1.20 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("<1.2  <1.2 green green <1.2  => PLAY");
            return true;
        }
        else if (fourBeforeLast <= 1.20 && threeBeforeLast <= 1.20 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
            console.log("<1.2 <1.2 <1.2 green <1.2  => PLAY");
            return true;
        }                
        
        else if (fourBeforeLast < 1.80 && threeBeforeLast < 1.80 && twoBeforeLast <= 1.20 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("red red <1.2 <1.2 <1.2 => PLAY");
            return true;
        }
        else if (threeBeforeLast <= 1.20 && twoBeforeLast <= 1.20 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("<1.2 <1.2 <1.2 <1.2 => PLAY");
            return true;
        }
        else if (fourBeforeLast < 1.80 && threeBeforeLast <= 1.20 && twoBeforeLast < 1.80 && oneBeforeLast <= 1.20 && lastBurst <= 1.20) {
            console.log("red 1.2 red <1.2 <1.2 => PLAY");
            return true;
        }

        else if (fourBeforeLast < 1.80 && threeBeforeLast <= 1.20 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("red <1.2 <1.2 green <1.2 => PLAY");
            return true;
        } 

        else if (threeBeforeLast <= 1.20 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("<1.2 <1.2 green <1.2 => PLAY");
            return true;
        } 
        else if (fiveBeforeLast <= 1.20 && fourBeforeLast <= 1.20 && threeBeforeLast > 1.79 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("<1.2 <1.2 green <1.2 green <1.2 => PLAY");
            return true;
        } 
        else if (sixBeforeLast <= 1.20 && fiveBeforeLast <= 1.20 && fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && twoBeforeLast > 1.79 && oneBeforeLast <= 1.20) {    // PLAY!
            console.log("<1.2 <1.2 green <1.2 green <1.2  X => PLAY");
            return true;
        } 

        else if (fiveBeforeLast < 1.80 && fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("red green <1.2 X green <1.2 => PLAY");
            return true;
        } 
        else if (fiveBeforeLast < 1.80 && fourBeforeLast > 1.79 && threeBeforeLast <= 1.20 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("red green red red green <1.2 => PLAY");
            return true;
        } 

        else if (sixBeforeLast <= 1.20 && fiveBeforeLast > 1.79 && fourBeforeLast <= 1.20 && threeBeforeLast > 1.79 && twoBeforeLast <= 1.20 && oneBeforeLast <= 1.20) {    // PLAY!
            console.log("<1.2 green <1.2 green <1.2 <1.2  X => PLAY");
            return true;
        } 

        else if (fiveBeforeLast < 1.80 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            console.log("red red green red green red => PLAY");
            return true;
        } 
        else if (fiveBeforeLast > 1.79 && fourBeforeLast <= 1.20 && threeBeforeLast > 1.79 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            console.log("green <1.2 green <1.2 green red => PLAY");
            return true;
        }
        else if (fiveBeforeLast > 1.79 && fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast <= 1.20 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("green red green <1.2 green <1.2 => PLAY");
            return true;
        }
        else if (fiveBeforeLast > 1.79 && fourBeforeLast <= 1.20 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {    // PLAY!
            console.log("green <1.2 green red green <1.2 => PLAY");
            return true;
        }

        if (waitOutOfGameCount > 20 && loosesCount == looseThreshold + 1) {  // if it is first loose
            if (fourBeforeLast < 1.30 && threeBeforeLast <= 1.30 && twoBeforeLast <= 1.40 && oneBeforeLast > 1.79 && lastBurst <= 1.20) {
                console.log("<1.3 <1.3 <1.4 green <1.2 => PLAY");
                return true;
            }
            else if (fourBeforeLast < 1.80 && threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
                console.log("red green red green red => PLAY");
                return true;
            } 
            // else if (threeBeforeLast > 1.79 && twoBeforeLast < 1.80 && oneBeforeLast > 1.79 && lastBurst < 1.80) {    // PLAY!
            //     console.log("green red green red => PLAY");
            //     return true;
            // }
        }

        
        return false;
    }
    else if (newEntry <= 6) {
        return false;
    }

}

function MustHaveAfterAllLooses(ProfitArray) {    
    var index1 = 3.00;
    var looseTolerance1 = 10;
    var index2 = 1.20;
    var looseTolerance2 = 2;    
    var sum = 0;
    var bet = 0;
    for (var i = 0; i <= looseTolerance1; i++) {
        bet = Math.round(((ProfitArray[i] + sum) - 0.4) / (index1 - 1));
        sum += bet;
    }
    for (var i = looseTolerance1+1; i <= looseTolerance1 + looseTolerance2; i++) {
        bet = Math.round(((ProfitArray[i] + sum) - 0.4) / (index2 - 1));
        sum += bet;
    }
    return sum;
}

function CalculateNextExpectedProfitAndNextNecessaryAmount() {
    nextNecessaryAmount = 0;
    while (currentNecessaryAmount >= nextNecessaryAmount) {
        //calculate Next Necessary Amount:
        var indexForChange = 0;
        var valueOfFirstElement = nextProfitArray[0];
        for (var i = 1; i < 5; i++) {
            if (nextProfitArray[i] !=  valueOfFirstElement) {
                indexForChange = i;
                break;
            }
        }
        nextProfitArray[indexForChange]++;
        nextNecessaryAmount = MustHaveAfterAllLooses(nextProfitArray);
        // console.log(nextNecessaryAmount);
        // console.log(NextExpectedProfitArray);
    }
}