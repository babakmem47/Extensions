window.onload = function () {
    // console.log("sina is good boy");
    var myVar = setInterval(myTimer, 3000);
    var burstHistory = [];
    var currentBurst = 666;
    var looseCount = 0;
    var mablagh = 10;
    var zarib = 3.00;
    var playing = false;
    document.getElementsByClassName("cashout-amount")[0].value = 3.00;

    // if (document.getElementsByClassName("crash-row")[1].children[0].innerHTML) {
    // 	currentBurst = document.getElementsByClassName("crash-row")[1].children[0].innerHTML;
    // }

    function myTimer() {
        console.log("mablagh: " + mablagh);
        var newBurst = document.getElementsByClassName("crash-row")[1].children[0].innerHTML;
		console.log("current burst: ", currentBurst, "new burst: ", newBurst);
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
                        mablagh = 15;
                    }
                    else if (looseCount == 2) {
                        mablagh = 23;
                    }
                    else if (looseCount == 3) {
                        mablagh = 34;
                    }
                    else if (looseCount == 4) {
                        mablagh = 51;
                    }
                    else if (looseCount == 5) {
                        mablagh = 77;
                    }
                    else if (looseCount == 6) {
                        mablagh = 115;
                    }
                    else if (looseCount == 7) {
                        mablagh = 173;
                    }
                    else if (looseCount == 8) {
                        mablagh = 259;
                    }
                    else if (looseCount == 9) {
                        mablagh = 389;
                    }
                    else if (looseCount == 10) {
                        mablagh = 583;                        
                    }
                    else if (looseCount == 11) {
                        mablagh = 875;
                    }
                    else if (looseCount == 12) {
                        mablagh = 1312;
                    }
                    else if (looseCount == 13) {
                        mablagh = 1968;
                    }
                    else if (looseCount == 14) {
                        mablagh = 2952;
                    }
                    else if (looseCount == 15) {
                        mablagh = 4428;
                    }
                    else if (looseCount == 16) {
                        mablagh = 6642;
                    }
                    else if (looseCount == 17) {
                        mablagh = 9963;
                    }
					else if (looseCount == 18) {
                        mablagh = 14945;
					}
					else if (looseCount == 19) {
                        mablagh = 22417;
                    }
					else if (looseCount == 20) {
                        mablagh = 33626;
					}
					else if (looseCount == 21) {
                        mablagh = 50439;
                    }
                }
                else {                      // win
                    mablagh = 10;
                    looseCount = 0;
                }
                document.getElementsByClassName("game-amount")[0].value = mablagh;
                var betButton = document.getElementsByClassName("place-bet")[0];
                betButton.click();
            }
            else {
                document.getElementsByClassName("game-amount")[0].value = 10;
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
