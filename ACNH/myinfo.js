//console.log(JSON.parse(local));

var villagerAPI = 'https://acnhapi.com/v1/villagers/';
var bugsAPI = 'https://acnhapi.com/v1/bugs/';
var fishAPI = 'https://acnhapi.com/v1/fish/';
var seaAPI = 'https://acnhapi.com/v1/sea/';
window.onload = function() {

    var villagers_serialized = JSON.parse(localStorage.myVillagers); //return an array (instead of string) of myVillager array in localStorage
    var bugs_serialzied = JSON.parse(localStorage.myBugs);
    var fish_serialized = JSON.parse(localStorage.myFish);
    var sea_serialized = JSON.parse(localStorage.mySea);

    for(var i = 0; i < villagers_serialized.length; i++) {
        insertVillagers(villagerAPI.concat(villagers_serialized[i]));
    }

    for(var i = 0; i < bugs_serialzied.length; i++) {
        insertBugs(bugsAPI.concat(bugs_serialzied[i]));
    }

    for(var i = 0; i < fish_serialized.length; i++) {
        insertFish(fishAPI.concat(fish_serialized[i]));
    }

    for(var i = 0; i < sea_serialized.length; i++) {
        insertSea(seaAPI.concat(sea_serialized[i]));
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
    })
}

function insertBugs(api){
    fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data.name);
            var main = document.getElementById('bugs');
            var bug = document.createElement('div');
            bug.classList.add("bug");
            var img = document.createElement("img");
            var name = document.createElement('div');
            // name.classList.add("name");

            //set the name and image of villager
            // name.innerHTML = data.name["name-USen"];
            img.src = data.icon_uri;

            //append the name and image to the villager element
            bug.appendChild(img);
            // bug.appendChild(name);

            //append the villager to the main area of the page
            main.appendChild(bug);
    })
}

function insertFish(api){
    fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data.name);
            var main = document.getElementById('fish');
            var fish = document.createElement('div');
            fish.classList.add("bug");
            var img = document.createElement("img");
            // var name = document.createElement('div');
            //name.classList.add("name");

            //set the name and image of villager
            //name.innerHTML = data.name["name-USen"];
            img.src = data.icon_uri;

            //append the name and image to the villager element
            fish.appendChild(img);
            //fish.appendChild(name);

            //append the villager to the main area of the page
            main.appendChild(fish);
    })
}

function insertSea(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            //villagersList.push(data);
            //create the necessary HTML objects for each villager
            var main = document.getElementById('sea');
            var sea = document.createElement('div');
            sea.classList.add("sea");
            var img = document.createElement("img");
           // var name = document.createElement('div');
           // name.classList.add("name");

            //set the name and image of villager
           // name.innerHTML = data.name["name-USen"];
            img.src = data.icon_uri;

            //append the name and image to the villager element
            sea.appendChild(img);
            //sea.appendChild(name);

            //append the villager to the main area of the page
            main.appendChild(sea);
    })
}