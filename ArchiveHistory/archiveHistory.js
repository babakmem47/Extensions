///////////////////////////////////    Strategy    ////////////////////////////////////////////////

// Get history

//////////////////////////////////////////////////////////////////////////////////////////////////

var waitForNewBurst = null;
var historyOfBursts = [];
var timeHistoryOfBursts = [];
var newBurst = "-";
var newEntry = 0;

window.onload = function () {
    console.log("window loaded");

    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

function CheckForNewBurstEveryOneSecond() {
    try {
        newBurst = document.getElementsByClassName("crash-row")[0].children[0].innerHTML;
        console.log(newBurst);
        if (newBurst != "-") {   // New burst added
            
            var d = new Date();
            var h = d.getHours();
            h = h > 9 ? h : "0" + h;
            var m = d.getMinutes();
            m = m > 9 ? m : "0" + m;
            var s = d.getSeconds();
            s = s > 9 ? s : "0" + s;
            var t = h + ":" + m + ":" + s
            console.log(t);
            // stop waiting for new burst(for now!):
            clearInterval(waitForNewBurst);

            newEntry++;

            historyOfBursts.push(newBurst);
            console.log(historyOfBursts);
            var timePlusBurst = t + "  " + newBurst;
            timeHistoryOfBursts.push(timePlusBurst);
            console.log(timeHistoryOfBursts);
            
            // wait 4 second and act:
            setTimeout(WaitForFourSeconds, 4000);
            console.log("new burst: ", newBurst, " count of bursts until now:", newEntry);

            if (newEntry % 20 == 0) {
                var textDoc = document.createElement('a');
                textDoc.href = 'data:attachment/text,' + encodeURI(historyOfBursts);
                textDoc.target = '_blank';                
                // get a new date (locale machine date time)
                var date = new Date();
                // get the date as a string
                var n = date.toDateString();
                // get the time as a string
                var time = date.toLocaleTimeString();    
                textDoc.download = date + " " + time + " " + historyOfBursts.length;
                textDoc.click();     
            }

            if (newEntry % 21 == 0) {
                var textDoc1 = document.createElement('a');
                textDoc1.href = 'data:attachment/text,' + encodeURI(timeHistoryOfBursts);
                textDoc1.target = '_blank';                                 
                textDoc1.download =t + timeHistoryOfBursts.length;
                textDoc1.click();     
            }
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

    // activate waiting for new burst again:
    waitForNewBurst = setInterval(CheckForNewBurstEveryOneSecond, 1000);
}

