const apiurl = 'https://acnhapi.com/v1/fish/';

var fishList = [];
var myFish;


for(var i = 1;i<=80;i++){
    var api = apiurl.concat(i);
    insertFish(api);
}

window.onload = function() {

    document.getElementById("all-button").addEventListener("click", function(){
        document.getElementById("push").innerHTML="";
        for(var i=1;i<=80;i++){
            insertFish(apiurl.concat(i));
        }
    });

    var searchBtn = document.getElementById("search_button");
    var search = document.getElementById("search");

    searchBtn.addEventListener("click", function(){
        document.getElementById("here").innerHTML="";
        for(var i=0;i<80;i++){
            if(fishList[i].name["name-USen"].includes(search.value.toLowerCase())){
                insertFish(apiurl.concat(fishList[i].id));
            }
        }
    });
}

function insertFish(api){
    fetch(api)
        .then(res => res.json())
        .then(data => {
            fishList.push(data);

            var main = document.getElementById("here");
            var fish = document.createElement("div");
            fish.classList.add("fish");

            var img = document.createElement("img");
            var name = document.createElement("div");
            name.classList.add("name");
            name.innerHTML = data.name["name-USen"];

            img.src = data.image_uri;
            fish.appendChild(img);
            fish.appendChild(name);

            document.getElementById("here").appendChild(fish);

            let hoverData = data.name["name-USen"];
            img.title = hoverData;

            img.onclick = function() {
                document.getElementById("name").innerHTML = "Name: " + data.name["name-USen"];
                document.getElementById("name").classList.add("name");

                if(data.availability["isAllYear"]===true){
                    document.getElementById("n-months").innerHTML = "Months: All Year";
                    document.getElementById("s-months").innerHTML = "Months: All Year";
                }else{
                    document.getElementById("n-months").innerHTML = "Months: "+data.availability["month-northern"];
                    document.getElementById("s-months").innerHTML = "Months: "+data.availability["month-southern"];
                }

                if(data.availability["isAllDay"]===true){
                    document.getElementById("n-time").innerHTML = "Time: All Day";
                    document.getElementById("s-time").innerHTML = "Time: All Day";
                }else{
                    document.getElementById("n-time").innerHTML = "Time: "+data.availability["time"];
                    document.getElementById("s-time").innerHTML = "Time: "+data.availability["time"];
                }
                
                document.getElementById("shadow").innerHTML = "Shadow Size: "+ data.shadow;
                document.getElementById("price").innerHTML = "Price: "+ data.price;
                document.getElementById("cj-price").innerHTML = "CJ's Price: "+(data.price*1.5);

                document.getElementById("add").onclick = function() {
                    //if localStorage has the array, myFish is the array - otherwise, we have an empty array
                    myFish = (localStorage.hasOwnProperty("myFish")) ? JSON.parse(localStorage.myFish) : [];
                    localStorage.setItem("myFish", myFish);
                    if(!localStorage.myFish.includes(data.id) && myFish.length <= 80) {
                        myFish.push(data.id);
                        console.log(data.id);
                        localStorage.setItem("myFish", JSON.stringify(myFish));
                    } else { 
                        console.log(localStorage);
                        localStorage.setItem("myFish", "[" + localStorage.myFish + "]");
                        console.log("already in or limit exceeded");
                    }
                }
            };
        });
}