

// var ExpectedProfit = [11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
//                    0   1   2   3   4   5   6   7   8   9   10  11 12 13 14 15 
//var ExpectedProfit = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0];
var ExpectedProfit = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
var currentNecessaryAmount = MustHaveAfterAllLooses(ExpectedProfit);
console.log(currentNecessaryAmount);

var nextProfitArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var nextNecessaryAmount = 0;
// var necessaryAmount = MustHaveAfterAllLooses(ExpectedProfit);
// console.log(necessaryAmount);
// var interest = 42613;
var interest = 35702;
var wantToPlayInterest = interest;

for (var i = 0; i < ExpectedProfit.length; i++) {
    nextProfitArray[i] = ExpectedProfit[i];    
 }
 
 CalculateNextExpectedProfit();
 console.log(nextProfitArray);
 console.log(nextNecessaryAmount);

 
 //  CalculateNextExpectedProfit();
// while (nextNecessaryAmount < wantToPlayInterest) {
//     CalculateNextExpectedProfit();
// }
// console.log(ExpectedProfit);



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

function CalculateNextExpectedProfit() {      
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
    // ExpectedProfit = NextExpectedProfitArray;
    // console.log(ExpectedProfit);
}