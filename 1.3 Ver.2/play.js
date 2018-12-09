///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. Start play after 2 new burst with index: 1.30 ExpectedProfit = [6, 7, 0, 0] interest: 3731.  
// 2. After first loose play with index: 1.3 again. 
//    After 2nd loose play with index:   1.2. 
//    After 3rd loose, stop playing. 
// 3. Wait until see one of below situation(wait for 1.2): 
//                                          Not after: a series of red  
//                                          Not after: red red green green   
//                                          Not after: green 1.2 green
//                                          Not after: big fat green
//                                          Not after: green green 1.46 green 1.76 
//                                          Not after: green green green 1.37  
//                                          Not after: 4 consecutive green play
//                                          Not after: 5 consecutive green play
//                                          یکی در میون آخری زیر 1.40 برو تو
//                                          0. green green green green 1.09  play!
//                                          0. green green green green 1.00  play!
//                                          0. green green green 1.35 green 0.00 play!
//                                          0. green green green green 1.09 green 1.56 play!
//                                          0. green 1.03 green 1.21 play  
//                                          0. green green 1.58 green 1.00 play  
//                                          0. green green 1.22 green green 1.05 play  
//                                          0. green green 1.11 1.20 1.06 green 1.31 play  
//                                          0. 1.25 1.14 1.70 1.13 green green 1.12 play  
//                                          0. 1.35 green 1.06 1.22 green 1.04 play  
//                                          0. 1.12 green green 0.00 green 1.19 1.01 play  
//                                          1. a less than 1.2 between 2 green number(last number not > 5).
//                                          1. a less than 1.2 after 5 out of 6 green.
//                                          2. green green 1.19 green 1.07 play
//                                          2. 1.04 1.61 green green green 1.07 play
//                                          3. green green green green 1.15 play
//                                          3. green green 1.22 green green play
//                                          4. green 1.27 1.12 1.02 green play
//                                          5. a series of 2 or more less than 1.2 when finished(series between greens).
//                                          5. green 1.11 1.00 1.02 
//                                          6. 1.00 green green green 1.14  play
//                                          7. green green  1.14  green  1.05  
//                                          7. green 1.08  green green  1.09  
//                                          7. green 1.14  green green  1.05  
//                                          7. green green green 1.19  1.12  
//    Then play with index: 1.2 for last time.
// 4. if win, start with initial amount.
// 5. increase ExpectedProfit if possible.

//////////////////////////////////////////////////////////////////////////////////////////////////

var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 1.3;
var ExpectedProfit = [6, 7, 0, 0];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 3731;
var betAmount = 0;
var loosesSum = 0;
var playingForFirstTime = true;


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
                    if (loosesCount >= 3) {
                        playing = false;
                    }
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                }
            }
            else if (!playing) {             // if not play because of: 1.first time  2. loose 3th or 4th time           
                if (playingForFirstTime) {
                    if (newEntry >= 2) {  // counting new bursts until reach 2 to play for first time
                        playing = true;
                        playingForFirstTime = false;
                    }
                }
                else if (loosesCount >= 3) {
                    if (newBurst >= 1.80) {
                        playing = true;
                    }
                }
            }

            // calculate remain interest:   // I comment it because I dont want to play with my all money!
            // split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            // interest = split[0].concat(split[1]);


            historyOfBursts.push(newBurst);

            ////// increase profit (if possible) depend on interest grow ///////////////////////
            console.log(ExpectedProfit);
            ExpectedProfit[0]++;
            console.log(ExpectedProfit);
            var sum = 0;
            for (var i = 0; i < ExpectedProfit.length; i++) {
                sum += Math.round(((ExpectedProfit[i] + sum) - 0.4) / (index - 1));
            }
            console.log("sum: ", sum);
            if (sum < interest) {
                // successfully increase ExpectedProfit!!  because interest is enough
            }
            else {
                ExpectedProfit[0]--;    // interest is not enough. So rollback to previous value;
            }
            ////////////////////////////////////////////////////////////////////////////////////

            console.log(ExpectedProfit);
            betAmount = Math.round(((ExpectedProfit[loosesCount] + loosesSum) - 0.4) / (index - 1));
            console.log("looseCount: ", loosesCount, "  looseSum: ", loosesSum, "   betAmount: ", betAmount);
            console.log("playing: ", playing, "  greenLight: ", playingForFirstTime, "  interest: ", interest);

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
    }

    // activate waiting for new burst again:
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

