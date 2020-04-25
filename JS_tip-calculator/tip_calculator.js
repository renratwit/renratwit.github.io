let totalValue;

var total = document.getElementById("total");

total.addEventListener("input", () => {
    totalValue = total.value;
})

let service = document.getElementById("service");

let calculateTip = document.getElementById("calculateTip");

calculateTip.addEventListener("click", () => {
    let billTotal = parseFloat(totalValue) * parseFloat(service.value) + parseFloat(totalValue);

    let display = document.getElementById("display");
    display.innerHTML = billTotal;
})



