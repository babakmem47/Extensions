///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// 1. play with index 3.00 for 9 round. Then play with index 2.50 for 6 round. Then play with index 2.00 for the last 3 round

///////////////////////////////////////////////////////////////////////////////////////////////////


var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var playing = false;
var index = 3.00;
//   1   2   3     4    5    6    7    8    9   10   11   12    13   14   15   16   17   18   19   20  21   22   23   24   25
//var ExpectedProfit = [20, 100, 100, 100, 100, 100, 100, 100, 100, 200, 200, 200, 200, 200, 200, 200, 200, 200, 400, 400, 400, 400, 400, 400, 400];
//var ExpectedProfit = [20, 100, 101, 100, 100, 100, 100, 100, 99, 278, 228, 229, 279, 229, 228, 400, 400, 400, 100, 100, 100, 100, 100, 100];
//                     1                               9  10  11  12  13  14  15  16  17  18      
var ExpectedProfit = [10, 10, 10, 10, 10, 10, 10, 10, 10, 27, 22, 22, 27, 22, 22, 22, 22, 40, 10, 10, 10, 10, 10, 10];
var newEntry = 0;
var loosesCount = 0;
var split = ["", ""];
var interest = 0;
var betAmount = 0;
var loosesSum = 0;
var playingForFirstTime = true;
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

            historyOfBursts.push(newBurst);

            newEntry++;
            if (playing) {
                if (newBurst < index) {   // loosing when playing: calculate loose count
                    loosesCount++;
                    loosesSum = betAmount + loosesSum;
                    index = 3.00;
                    winningStreak = 0;
                    if (loosesCount >= 10 && loosesCount < 17) {
                        index = 2.50;
                    }
                    if (loosesCount >= 17) {
                        index = 2.00;
                    }
                }
                else if (newBurst >= index) {  // winning
                    loosesCount = 0;
                    loosesSum = 0;
                    winningStreak++;
                    index = 3.00;
                    playing = false;
                }
            }
            else if (!playing) {             // if not play because of: 1.first time  2. wait for 2 red      
                if (newEntry >= 2) {
                    var safe = false;
                    var beforeNewBurst = historyOfBursts[historyOfBursts.length - 2];
                    if (newBurst < 1.80 && beforeNewBurst < 1.80) {
                        console.log("safe: ", safe, " before new burst: ", beforeNewBurst);
                        playing = true;
                    }
                }
                
            }

            //calculate remain interest: 
            split = document.getElementsByClassName("top-link chips-amount")[0].innerHTML.split(" ")[0].split(",");
            interest = split[0].concat(split[1]);


            

            // console.log(ExpectedProfit);
            betAmount = Math.round(((ExpectedProfit[loosesCount] + loosesSum) - 0.4) / (index - 1));
            console.log("index: ", index, "looseCount: ", loosesCount, "  looseSum: ", loosesSum, "   betAmount: ", betAmount, "  interest: ", interest);
            console.log("playing: ", playing, "winning streak: ", winningStreak, "  entry: ", newEntry);

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
