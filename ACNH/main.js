var bugsList = [];
var fishList = [];
var seaList = [];

var date = new Date();
var month = date.getMonth() + 1;
var hour = date.getHours();

window.onload = function() {
    for(var i = 1; i <= 80; i++) {
        var api = "https://acnhapi.com/v1/bugs/".concat(i);  
        fetch(api)
            .then(res => res.json())
            .then(data => {
                bugsList.push(data);
                
                if(data.availability["month-array-northern"].includes(month) && data.availability["time-array"].includes(hour)){

                    var main = document.getElementById('dailyBugs');
                    var bug = document.createElement('div');
                    bug.classList.add("bug");
                    var img = document.createElement("img");
                    var name = document.createElement('div');
                    name.classList.add("name");
    
                    name.innerHTML = data.name["name-USen"];
                    img.src = data.icon_uri;

                    bug.appendChild(img);
                    bug.appendChild(name);
    
                    main.appendChild(bug);
                }
    
            });
    }

    for(var i = 1; i <= 80; i++) {
        var api = "https://acnhapi.com/v1/fish/".concat(i);  
        fetch(api)
            .then(res => res.json())
            .then(data => {
                fishList.push(data);
                
                if(data.availability["month-array-northern"].includes(month) && data.availability["time-array"].includes(hour)){
                   //create the necessary HTML objects for each bug
                    var main = document.getElementById('dailyFish');
                    var fish = document.createElement('div');
                    fish.classList.add("fish");
                    var img = document.createElement("img");
                    var name = document.createElement('div');
                    name.classList.add("name");
    
                    name.innerHTML = data.name["name-USen"];
                    img.src = data.icon_uri;
    
                    fish.appendChild(img);
                    fish.appendChild(name);

                    main.appendChild(fish);
                }
    
            });
    }

    for(var i = 1; i <= 40; i++) {
        var api = "https://acnhapi.com/v1/sea/".concat(i);  
        fetch(api)
            .then(res => res.json())
            .then(data => {
                seaList.push(data);

                if(data.availability["month-array-northern"].includes(month) && data.availability["time-array"].includes(hour)){
                    var main = document.getElementById('dailySea');
                    var sea = document.createElement('div');
                    sea.classList.add("sea");
                    var img = document.createElement("img");
                    var name = document.createElement('div');
                    name.classList.add("name");
    
                    name.innerHTML = data.name["name-USen"];
                    img.src = data.icon_uri;
    
                    sea.appendChild(img);
                    sea.appendChild(name);
                    
                    main.appendChild(sea);
                }
    
            });
    }

    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var current_sign = "";
    
        switch(month){
            case 0:
                if(day<=19){
                    current_sign = "Capricorn";
                }else{
                    current_sign = "Aquarius";
                }
                break;
            case 1:
                if(day<=18){
                    current_sign = "Aquarius";
                }else{
                    current_sign = "Pisces";
                }
                break;
            case 2:
                if(day<=20){
                    current_sign = "Pisces";
                }else{
                    current_sign = "Aries";
                }
                break;
            case 3:
                if(day<=19){
                    current_sign = "Aries";
                }else{
                    current_sign = "Taurus";
                }
                break;
            case 4:
                if(day<=20){
                    current_sign = "Taurus";
                }else{
                    current_sign = "Gemini";
                }
                break;
            case 5:
                if(day<=20){
                    current_sign = "Gemini";
                }else{
                    current_sign = "Cancer";
                }
                break;
            case 6:
                if(day<=22){
                    current_sign = "Cancer";
                }else{
                    current_sign = "Leo";
                }
                break;
            case 7:
                if(day<=22){
                    current_sign = "Leo";
                }else{
                    current_sign = "Virgo";
                }
                break;
            case 8:
                if(day<=22){
                    current_sign = "Virgo";
                }else{
                    current_sign = "Libra";
                }
                break;
            case 9:
                if(day<=22){
                    current_sign = "Libra";
                }else{
                    current_sign = "Scorpio";
                }
                break;
            case 10:
                if(day<=21){
                    current_sign = "Scorpio";
                }else{
                    current_sign = "Sagittarius";
                }
                break;
            case 11:
                if(day<=21){
                    current_sign = "Sagittarius";
                }else{
                    current_sign = "Capricorn";
                }
                break;
            default:
                current_sign = "NULL";
                break;
        }
    
    console.log(current_sign);
    document.getElementById("sign").innerHTML = "Current Zodiac: "+current_sign;
    
    let words = 
        ["Talented folks are just normal folks who practice something more than other folks, maaan.",
        "It's more fun to ride a slow bike fast than a fast bike slow. But, like, a waterslide is more fun than ANY bike.",
        "It's not all about the Bells, maaaan. There's also weeding, and fishing, and crafting, and bug catching, and...",
        "Castles are just, like, houses that're wearing armor, maaan.",
        "If you can't get your jam out of the jar, does that mean you're in a jammed-jam jam?",
        "If time is always running out..are we doing something to chase it away?",
        "You ever wonder when an island stops being an island and turns into just...the land? Maaaaaaan!",
        "You don't always get to do what you love, but you can always learn to love what you do.",
        "Eyeballs are like windows so your brain can look outside, and your brain needs that sunshine, maaan!",
        "Maaaaan...I know I say that a lot, but what do I even mean by it? Maaaaan!",
        "Do you think ducks get confused during heated dodgeball matches?",
        "Do roosters go back to sleep after they wake everyone up? I mean, they're pretty much done for the day.",
        "If kayak is still kayak backward, how do you know if you're saying it in the right direction? Think about it...",
        "Magic is just science with your eyes closed, maaan.",
        "No one likes a traffic jam. But traffic jelly? Slap some peanut butter on it and it’s aaaall good.",
        "You ever look up at the clouds in the sky and imagine shapes? They're doin' the same thing to you, maaan.",
        "Music is just air gettin' its dance on, maaan. We're all breathing shy songs that want to cut a rug.",
        "Afterthoughts are still thoughts. They just come after other thoughts.",
        "You can't worry about people thinkin' you're a fake. Everything you do is real! Unless you're, like, a hologram.",
        "It's impossible to mail boomerangs. No matter how many stamps you put on 'em, they always come back.",
        "NookPhones give you all those apps to keep you from ordering an entree. They're fillin' us up on bread, maaaan.",
        "Want to attract a bunch of otters? Scallop-shaped hot-air balloon, maaaan... Otters for miles.",
        "They always reboot movies, so why not food? And can I get a sequel to carbonara? Carbonara 2, maaan!",
        "It's important to take slow, deep breaths when you get mad. Short, fast ones just make you lightheaded.",
        "When someone tells you to hold your horses, you tell them no. Maaan, they're way too heavy!",
        "It's really easy to forget you have toes...until you stub one. Then it's like, \"What are these things, man?\"",
        "Sometimes I think about learning to make bread, but then I remember I'm already pretty good at buying it.",
        "If you're cool with wearing your pajamas all day, maybe you actually just like wearing your clothes to bed.",
        "Rocks are the oysters of the land.",
        "Where you are, whether you're in a house or in your own head, make it comfy. You be good to you, maaan.",
        "Sometimes I wish I was a bird. It's pretty obvious why - so I could turn my head back and forth real fast!",
        "Ever read a book about gravity? They're impossible to put down, maaan...",
        "Remember, even if things are bad, there are always hammocks.",
        "Who was the first to think that eating shellfish was a good idea? Must have been an otter...",
        "Isn’t your birthday just the anniversary of something somebody else did? Think about it, maaan.",
        "They say \"swing for the fences\" and \"go the whole nine yards,\" but, like, what if you don't play hockey?",
        "You wear the hat-the hat doesn\'t wear you. If it does, well, then you need a smaller hat, maaan."];

    var random = Math.floor(Math.random()*words.length);
    
    var wisdom = document.createElement("p");
    var text = document.createTextNode(words[random]);
    wisdom.appendChild(text);
    document.getElementById("scallop").appendChild(wisdom);
    console.log(words[random]);

}