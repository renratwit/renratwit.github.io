const apiurl = 'http://acnhapi.com/v1/villagers/';

var villagersList = [];
var selectedVillagerList = [];
var personality = ["Uchi", "Jock", "Normal", "Peppy", "Smug", "Snooty", "Lazy", "Cranky"];

for(var i = 1; i <= 391; i++) {
var api = "http://acnhapi.com/v1/villagers/".concat(i);

    fetch(api)
    .then(res => res.json())
    .then(data => {
        villagersList.push(data);
        var main = document.getElementById('main');
        var villager = document.createElement('div');
        villager.classList.add("villager");

        var img = document.createElement("img");
        var name = document.createElement('div');
        name.classList.add("name");
        name.innerHTML = data.name["name-USen"];
        
        img.src = data.image_uri;
        villager.appendChild(img);
        villager.appendChild(name);

        main.appendChild(villager);
        
        let hoverData = data.name["name-USen"];
        img.title = hoverData;

        img.onclick = function() {
            console.log("image is clicked");
            document.getElementById('name').innerHTML ="Name: "  + data.name["name-USen"];
            document.getElementById('personality').innerHTML = "Personality: " + data.personality;
            console.log(data.personality);
            document.getElementById('birthday').innerHTML = "Birthday: " + data["birthday-string"];
            document.getElementById('gender').innerHTML = "Gender: " + data.gender;
        };

    });//end api fetch;

}//end for-loop


//add buttons
window.onload = function() {

    //search by personality
    for(var i = 0; i < personality.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = personality[i];
        document.getElementById('buttons').appendChild(button);
        button.value = personality[i];

        button.addEventListener("click", function() {
            console.log(this.value);
            selectedVillagerList = [];
            document.getElementById('main').innerHTML = "";

            for(var i = 0; i < villagersList.length; i++) {
                if(villagersList[i].personality === this.value) {
                    console.log("pushing villager")
                    selectedVillagerList.push(villagersList[i].id);
                }
            }

            for(var i = 0; i < selectedVillagerList.length; i++) {
                var api = "http://acnhapi.com/v1/villagers/".concat(selectedVillagerList[i]);

                fetch(api)
                .then(res => res.json())
                .then(data => {
                    villagersList.push(data);
                    var main = document.getElementById('main');
                    var villager = document.createElement('div');
                    villager.classList.add("villager");
            
                    var img = document.createElement("img");
                    var name = document.createElement('div');
                    name.classList.add("name");
                    name.innerHTML = data.name["name-USen"];
                    
                    img.src = data.image_uri;
                    villager.appendChild(img);
                    villager.appendChild(name);
            
                    main.appendChild(villager);
                    
                    let hoverData = data.name["name-USen"];
                    img.title = hoverData;
            
                    img.onclick = function() {
                        console.log("image is clicked");
                        document.getElementById('name').innerHTML ="Name: "  + data.name["name-USen"];
                        document.getElementById('personality').innerHTML = "Personality: " + data.personality;
                        console.log(data.personality);
                        document.getElementById('birthday').innerHTML = "Birthday: " + data["birthday-string"];
                        document.getElementById('gender').innerHTML = "Gender: " + data.gender;
                    };
            
                });//end api fetch;
            }
            
        }); //end button eventListener

    }//end personality for-loop

    //search by name
    var searchBtn = document.getElementById('search_button');
    var search = document.getElementById('search');
    
    searchBtn.addEventListener("click", function(){
        console.log(search.value);
    });
    
    
}

function insertVillagers(arr) {
    console.log("inserting villagers");
    for(var i = 0; i < arr.length; i++) {
        var data = arr[i];
        var main = document.getElementById('main');
        var main = document.getElementById('main');
        var villager = document.createElement('div');
        villager.classList.add("villager");
        var img = document.createElement("img");
        var name = document.createElement('div');
        name.classList.add("name");

        name.innerHTML = data.name["name-USen"];
        img.src = data.img_uri;
        villager.appendChild(img);
        villager.appendChild(name);

        main.appendChild(villager);
        
    }
}
 

