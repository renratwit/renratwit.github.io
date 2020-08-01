const apiurl = 'https://acnhapi.com/v1/bugs/';

var bugsList = [];

var myBugs = [];

window.onload = function() {
//insert all bugs upon loading
    for(var i = 1; i <= 80; i++) {
        var api = "https://acnhapi.com/v1/bugs/".concat(i);    
        insertBugs(api);
    }

    if(localStorage.getItem("myBugs") === null) {
        localStorage.setItem("myBugs", myBugs); 
        console.log("here-bugs");
    }
}

function insertBugs(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            bugsList.push(data);

            //create the necessary HTML objects for each bug
            var main = document.getElementById('main');
            var bug = document.createElement('div');
            bug.classList.add("bug");
            var img = document.createElement("img");
            var name = document.createElement('div');
            name.classList.add("name");

            //set the name and image of villager
            name.innerHTML = data.name["name-USen"];
            img.src = data.image_uri;

            //append the name and image to the villager element
            bug.appendChild(img);
            bug.appendChild(name);

            //append the bug to the main area of the page
            main.appendChild(bug);
            
            //display infor when hovering
            let hoverData = data.name["name-USen"];
            img.title = hoverData;

            img.onclick = function() {
                console.log("image is clicked");
                document.getElementById('name').innerHTML ="Name: "  + data.name["name-USen"];
                document.getElementById('price').innerHTML = "Price: " + data.price;
                document.getElementById('months').innerHTML = "Months: " + data.availability["month-northern"];
                document.getElementById('time').innerHTML = "Time: " + data.availability["time"];

                document.getElementById("add").onclick = function() {
                    if(!localStorage.myBugs.includes(data.id) && myBugs.length <= 80) {
                        myBugs.push(data.id);
                        console.log(data.id);
                        localStorage.setItem("myBugs", JSON.stringify(myBugs));
                    } else { console.log("already in or limit exceeded") }
                }
            };

            

        });//end api fetch;
        
}
