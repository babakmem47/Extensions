var ExpectedProfit = [11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
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
var increasedProfit = ExpectedProfit;
console.log(increasedProfit);
var InitialInterest = 30000;
var currentInterest = 30420;
var indexForIncreaseProfitArray = 1;
increasedProfit[indexForIncreaseProfitArray]++;
console.log(increasedProfit);
var sum = 0;
var initialIndex = 3.00
for (var i = 0; i < 11; i++) {
    sum += Math.round(((increasedProfit[i] + sum) - 0.4) / (initialIndex - 1));
    console.log(sum);
}
initialIndex = 1.20;
for (var i = 11; i < 13; i++) {
    sum += Math.round(((increasedProfit[i] + sum) - 0.4) / (initialIndex - 1));
    console.log(sum);
}
if (sum < InitialInterest) {
    ExpectedProfit = increasedProfit;
    indexForIncreaseProfitArray++;
}
console.log(ExpectedProfit);
console.log(indexForIncreaseProfitArray);
