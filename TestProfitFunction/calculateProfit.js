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
// var increasedProfit = ExpectedProfit;
// console.log(increasedProfit);
// var InitialInterest = 30000;
// var currentInterest = 30420;
// var indexForIncreaseProfitArray = 1;
// //increasedProfit[indexForIncreaseProfitArray]++;
// console.log(increasedProfit);
// var sum = 0;
// var initialIndex = 3.00
// for (var i = 0; i < 11; i++) {
//     sum += Math.round(((increasedProfit[i] + sum) - 0.4) / (initialIndex - 1));
//     console.log(sum);
// }
// initialIndex = 1.20;
// for (var i = 11; i < 13; i++) {
//     sum += Math.round(((increasedProfit[i] + sum) - 0.4) / (initialIndex - 1));
//     console.log(sum);
// }
// if (sum < InitialInterest) {
//     ExpectedProfit = increasedProfit;
//     indexForIncreaseProfitArray++;
// }
// console.log(ExpectedProfit);
// console.log(indexForIncreaseProfitArray);
//                     0  1   2   3   4   5   6   7   8   9   10 11 12 13 14 15
var ExpectedProfit = [11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
// var necessaryAmount = MustHaveAfterAllLooses(ExpectedProfit);
// console.log(necessaryAmount);
var currentInterest = 30000;
CalculateNextExpectedProfit(currentInterest);

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

function CalculateNextExpectedProfit(currentInterest) {
    var NextExpectedProfitArray = ExpectedProfit;
    console.log(NextExpectedProfitArray);
    var currentNecessaryAmount = MustHaveAfterAllLooses(ExpectedProfit);
    console.log(currentNecessaryAmount);    
    var nextNecessaryAmount = 0;
    while (currentNecessaryAmount >= nextNecessaryAmount) {
        //calculate Next Necessary Amount:
        var indexForChange = 0;
        var valueOfFirstElement = NextExpectedProfitArray[0];
        for (var i = 1; i < 5; i++) {
            if (NextExpectedProfitArray[i] !=  valueOfFirstElement) {
                indexForChange = i;
                break;
            }
        }

        NextExpectedProfitArray[indexForChange]++;
        //console.log(NextExpectedProfitArray);
        nextNecessaryAmount = MustHaveAfterAllLooses(NextExpectedProfitArray);
        console.log(nextNecessaryAmount);
    }
    ExpectedProfit = NextExpectedProfitArray;
    console.log(ExpectedProfit);
}