var local = localStorage.user;
//console.log(JSON.parse(local));

var villagerAPI = 'https://acnhapi.com/v1/villagers/';

window.onload = function() {
var villagers_serialized = JSON.parse(localStorage.myVillagers); //return an array (instead of string) of myVillager array in localStorage
    for(var i = 0; i < villagers_serialized.length; i++) {
        insertVillagers(villagerAPI.concat(villagers_serialized[i]));
    }

    document.getElementById('reset-villagers').addEventListener("click", function() {
        console.log('resetting villagers');
        var emptyArray = [];
        localStorage.setItem("myVillagers", JSON.stringify(emptyArray));
    })
}

function insertVillagers(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            //villagersList.push(data);

            //create the necessary HTML objects for each villager
            var main = document.getElementById('villagers');
            var villager = document.createElement('div');
            villager.classList.add("villager");
            var img = document.createElement("img");
            var name = document.createElement('div');
            name.classList.add("name");

            //set the name and image of villager
            name.innerHTML = data.name["name-USen"];
            img.src = data.image_uri;

            //append the name and image to the villager element
            villager.appendChild(img);
            villager.appendChild(name);

            //append the villager to the main area of the page
            main.appendChild(villager);
            
            //display infor when hovering
            let hoverData = data.name["name-USen"];
            img.title = hoverData;
    })
}

function insertCritters(api){

}