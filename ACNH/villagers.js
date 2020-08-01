const apiurl = 'https://acnhapi.com/v1/villagers/';

var villagersList = [];
var selectedVillagerList = [];  //list for certain villagers based on search requirements
var personality = ["Uchi", "Jock", "Normal", "Peppy", "Smug", "Snooty", "Lazy", "Cranky"];

var myVillagers = []; //list for villagers in local cache

//insert all villagers upon loading
for(var i = 1; i <= 391; i++) {
    var api = "https://acnhapi.com/v1/villagers/".concat(i);    
    insertVillagers(api);
}


window.onload = function() {
    if(localStorage.getItem("myVillagers") === null) {
        localStorage.setItem("myVillagers", myVillagers); 
        console.log("here")
    }

    //create all buttons for each personality type
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
                    console.log("pushing villager");
                    selectedVillagerList.push(villagersList[i].id);     //push the villager ID to the selectedList
                }
            }

            //fetch API with selectedList entries as URL query and append villagers to main
            for(var i = 0; i < selectedVillagerList.length; i++) {
                var api = "https://acnhapi.com/v1/villagers/".concat(selectedVillagerList[i]);
                insertVillagers(api);
            }
            
        }); //end button eventListener

    }//end personality for-loop

    document.getElementById('all-button').addEventListener("click", function() {
        document.getElementById('main').innerHTML = "";
        for(var i = 1; i <= 391; i++) {
            insertVillagers("https://acnhapi.com/v1/villagers/".concat(i));
        }
    })

    //search by name
    var searchBtn = document.getElementById('search_button');
    var search = document.getElementById('search');
    
    searchBtn.addEventListener("click", function(){
        document.getElementById('main').innerHTML = "";
        selectedVillagerList = [];
        console.log(search.value);
        for(var i = 0; i < villagersList.length; i++) {
            if((villagersList[i].name["name-USen"]).includes(search.value)) {
                selectedVillagerList.push(villagersList[i].id);
            }
        }
        console.table(selectedVillagerList);
        for(var i = 0; i < selectedVillagerList.length; i++) {
            var api = "https://acnhapi.com/v1/villagers/".concat(selectedVillagerList[i]);
            insertVillagers(api);
        }
        
    });
    
    selectedVillagerList = [];
}//end window.onload

function insertVillagers(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            villagersList.push(data);

            //create the necessary HTML objects for each villager
            var main = document.getElementById('main');
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

            img.onclick = function() {
                console.log("image is clicked");
                document.getElementById('name').innerHTML ="Name: "  + data.name["name-USen"];
                document.getElementById('personality').innerHTML = "Personality: " + data.personality;
                console.log(data.personality);
                document.getElementById('birthday').innerHTML = "Birthday: " + data["birthday-string"];
                document.getElementById('gender').innerHTML = "Gender: " + data.gender;

                document.getElementById("add").onclick = function() {
                    if(!localStorage.myVillagers.includes(data.id) && myVillagers.length < 10) {
                        myVillagers.push(data.id);
                        console.log(data.id);
                        localStorage.setItem("myVillagers", JSON.stringify(myVillagers));
                    } else { console.log("already in or limit exceeded") }
                }
            };

        
        });//end api fetch;
        
}

