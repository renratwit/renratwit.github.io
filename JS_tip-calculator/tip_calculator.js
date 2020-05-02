let totalValue;

let partyCount = document.getElementById("count");
let i = 1; //holds the current value of Split_Check

var total = document.getElementById("total");

total.addEventListener("input", () => {
    totalValue = total.value;
})

let service = document.getElementById("service");

let calculateTip = document.getElementById("calculateTip");

calculateTip.addEventListener("click", () => {
    let billTotal =  ((parseFloat(totalValue) * parseFloat(service.value) + parseFloat(totalValue)) / i) ;
    
    let display = document.getElementById("display");
    display.innerHTML = "$" + parseFloat(billTotal.toFixed(2));
})



let increaseButton = document.getElementById("plus");
let decreaseButton = document.getElementById("minus");

increaseButton.addEventListener("click", function() {
    ++i;
    partyCount.innerHTML = i;
    console.log(i);
})

decreaseButton.addEventListener("click", function() {
    if(i !== 1) {
        partyCount.innerHTML = --i;
    }
    console.log(i);
})

