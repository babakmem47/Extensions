window.onload = function () {
    // console.log("sina is good boy");
    var myVar = setInterval(myTimer, 3000);
    var burstHistory = [];
    var currentBurst = 666;
    var looseCount = 0;
    var mablagh = 18;
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
                        mablagh = 27;
                    }
                    else if (looseCount == 2) {
                        mablagh = 40;
                    }
                    else if (looseCount == 3) {
                        mablagh = 60;
                    }
                    else if (looseCount == 4) {
                        mablagh = 90;
                    }
                    else if (looseCount == 5) {
                        mablagh = 135;
                    }
                    else if (looseCount == 6) {
                        mablagh = 202;
                    }
                    else if (looseCount == 7) {
                        mablagh = 303;
                    }
                    else if (looseCount == 8) {
                        mablagh = 455;
                    }
                    else if (looseCount == 9) {
                        mablagh = 682;                        
                    }
                    else if (looseCount == 10) {
                        mablagh = 1023;
                    }
                    else if (looseCount == 11) {
                        mablagh = 1535;
                    }
                    else if (looseCount == 12) {
                        mablagh = 2302;
                    }
                    else if (looseCount == 13) {
                        mablagh = 3453;
                    }
                    else if (looseCount == 14) {
                        mablagh = 5180;
                    }
                    else if (looseCount == 15) {
                        mablagh = 7770;
                    }
					else if (looseCount == 16) {
                        mablagh = 11655;
                    }
					else if (looseCount == 17) {
                        mablagh = 17482;
                    }
					else if (looseCount == 18) {
                        mablagh = 26223;
                    }
					else if (looseCount == 19) {
                        mablagh = 39335;
                    }
					else if (looseCount == 20) {
                        mablagh = 59002;
                    }
					else if (looseCount == 21) {
                        mablagh = 88503;
                    }
                    
                }
                else {                      // win
                    mablagh = 18;
                    looseCount = 0;
                }
                document.getElementsByClassName("game-amount")[0].value = mablagh;
                var betButton = document.getElementsByClassName("place-bet")[0];
                betButton.click();
            }
            else {
                document.getElementsByClassName("game-amount")[0].value = 18;
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
