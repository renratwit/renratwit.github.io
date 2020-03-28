let display = "";

function input(num) {
    display += num;
    document.getElementsByClassName("display")[0].value = display;
    console.log(num);
}

function insertAdd() {
    display += "+"
    document.getElementsByClassName("display")[0].value = display;
}

function insertMinus() {
    display += "-";
    document.getElementsByClassName("display")[0].value = display;
}

function insertDivide() {
    display += "/"
    document.getElementsByClassName("display")[0].value = display;
}

function insertMultiply() {
    display += "*";
    document.getElementsByClassName("display")[0].value = display;
}

function insertDecimal() {
    display += ".";
    document.getElementsByClassName("display")[0].value = display;
}

function del() {
    try {
    display = display.substring(0, display.length - 1);
    document.getElementsByClassName("display")[0].value = display;
    } catch {
        console.log("deleting from non-string");
    }
}

function c() {
    display = "";
    document.getElementsByClassName("display")[0].value = display;
    console.log("clearing");
}

function equal() {
    display = eval(display);
    console.log(display);
    document.getElementsByClassName("display")[0].value = display;
}
