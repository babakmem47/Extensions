window.onload = function () {
    // console.log("sina is good boy");
    var myVar = setInterval(myTimer, 3000);
    var burstHistory = [];
    var currentBurst = 666;
    var looseCount = 0;
    var mablagh = 50;
    var zarib = 3.00;
    var playing = false;
    document.getElementsByClassName("cashout-amount")[0].value = 3.00;

    // if (document.getElementsByClassName("crash-row")[1].children[0].innerHTML) {
    // 	currentBurst = document.getElementsByClassName("crash-row")[1].children[0].innerHTML;
    // }

    function myTimer() {
        var mablagh = document.getElementsByClassName("game-amount")[0].value;
       // var zarib = document.getElementsByClassName("cashout-amount")[0].value;
        var zarib = 3.00;
        console.log("mablagh: " + mablagh + "    zarib: " + zarib + "   lastBurst: " + currentBurst);
        var newBurst = document.getElementsByClassName("crash-row")[1].children[0].innerHTML;
        var saveAlready = true;
        if (newBurst != currentBurst) {
            burstHistory.push(newBurst);
            console.log(burstHistory);
            currentBurst = newBurst;
            saveAlready = false;
            if (playing) {
                if (zarib > currentBurst) {  // loose
                    looseCount++;
                    if (looseCount == 1) {
                        mablagh = 75;
                    }
                    else if (looseCount == 2) {
                        mablagh = 113;
                    }
                    else if (looseCount == 3) {
                        mablagh = 144;
                    }
                    else if (looseCount == 4) {
                        mablagh = 216;
                    }
                    else if (looseCount == 5) {
                        mablagh = 324;
                    }
                    else if (looseCount == 6) {
                        mablagh = 486;
                    }
                    else if (looseCount == 7) {
                        mablagh = 729;
                    }
                    else if (looseCount == 8) {
                        mablagh = 1094;
                    }
                    else if (looseCount == 9) {
                        mablagh = 1641;                        
                    }
                    else if (looseCount == 10) {
                        mablagh = 2461;
                    }
                    else if (looseCount == 11) {
                        mablagh = 3692;
                    }
                    else if (looseCount == 12) {
                        mablagh = 5538;
                    }
                    else if (looseCount == 13) {
                        mablagh = 8307;
                    }
                    else if (looseCount == 14) {
                        mablagh = 12460;
                    }
                    else if (looseCount == 15) {
                        mablagh = 18690;
                    }
					else if (looseCount == 16) {
                        mablagh = 28035;
                    }
					else if (looseCount == 17) {
                        mablagh = 42053;
                    }
					else if (looseCount == 18) {
                        mablagh = 63079;
                    }
					else if (looseCount == 19) {
                        mablagh = 94619;
                    }
					
                    
                }
                else {                      // win
                    mablagh = 50;
                    looseCount = 0;
                }
                document.getElementsByClassName("game-amount")[0].value = mablagh;
                var betButton = document.getElementsByClassName("place-bet")[0];
                betButton.click();
            }
            else {
                document.getElementsByClassName("game-amount")[0].value = 50;
                var betButton = document.getElementsByClassName("place-bet")[0];
                betButton.click();
                playing = true;
            }

        }

        // Save every burst history every 100 entry
        if (burstHistory.length % 50 == 0 && saveAlready == false) {
            var textDoc = document.createElement('a');
            textDoc.href = 'data:attachment/text,' + encodeURI(burstHistory);
            textDoc.target = '_blank';
            
            // get a new date (locale machine date time)
            var date = new Date();
            // get the date as a string
            var n = date.toDateString();
            // get the time as a string
            var time = date.toLocaleTimeString();

            // log the date in the browser console
            //console.log('date:', n);
            // log the time in the browser console
            //console.log('time:', time);

            textDoc.download = date + " " + time + " " + burstHistory.length;
            textDoc.click();
            saveAlready = true;
        }


    }
}
