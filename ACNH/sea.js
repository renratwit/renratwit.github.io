const apiurl = 'https://acnhapi.com/v1/sea/';

var seaList = [];

var mySea;

for(var i = 1;i<=40;i++){
    var api = apiurl.concat(i);
    insertSea(api);
}

window.onload = function() {
    document.getElementById("all-button").addEventListener("click", function(){
        document.getElementById("here").innerHTML="";
        for(var i=1;i<=40;i++){
            insertSea(apiurl.concat(i));
        }
    });

    var searchBtn = document.getElementById("search_button");
    var search = document.getElementById("search");

    searchBtn.addEventListener("click", function(){
        document.getElementById("here").innerHTML="";
        for(var i=0;i<80;i++){
            if(seaList[i].name["name-USen"].includes(search.value.toLowerCase())){
                insertSea(apiurl.concat(seaList[i].id));
            }
        }
    });
}

function insertSea(api){
    fetch(api)
        .then(res => res.json())
        .then(data => {
            seaList.push(data);

            var main = document.getElementById("here");
            var sea = document.createElement("div");
            sea.classList.add("sea");

            var img = document.createElement("img");
            var name = document.createElement("div");
            name.classList.add("name");
            name.innerHTML = data.name["name-USen"];

            img.src = data.image_uri;
            sea.appendChild(img);
            sea.appendChild(name);

            document.getElementById("here").appendChild(sea);

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

                document.getElementById("add").onclick = function() {
                    mySea = (localStorage.hasOwnProperty("mySea")) ? JSON.parse(localStorage.mySea) : [];
                    localStorage.setItem("mySea", mySea);
                    if(!localStorage.mySea.includes(data.id) && mySea.length <= 80) {
                        mySea.push(data.id);
                        console.log(data.id);
                        localStorage.setItem("mySea", JSON.stringify(mySea));
                    } else { 
                        localStorage.setItem("mySea", "[" + localStorage.mySea + "]");
                        console.log("already in or limit exceeded") 
                    }
                }
            };
        });
}