///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. Start play after 2 new burst with initial amount: 20, index: 1.30.  
// 2. Play until loose 3 times then after 3 loose quit playing.  
// 3. Wait until see next >= 1.80 then play with 4th amount to compensate looses. if loose: repeat No.3  .  
// 4. if win, start with initial amount: 20".

//////////////////////////////////////////////////////////////////////////////////////////////////

var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 1.3;
var ExpectedProfit = [7, 7, 5, 0, 0];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 0;
var betAmount = 0;
var loosesSum = 0;
var greenLight = false;


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
                if (loosesCount < 3) {
                    if (newEntry >= 2) {  // counting new bursts until reach 2 to play for first time
                        playing = true;
                    }
                }
                else if (loosesCount >= 3) {
                    if (newBurst >= 1.80) {
                        greenLight = true;
                        playing = true;
                    }
                }
            }

            // calculate remain interest:
            split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            interest = split[0].concat(split[1]);


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
            console.log("playing: ", playing, "  greenLight: ", greenLight, "  interest: ", interest);

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

