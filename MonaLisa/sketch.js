let img;
let sites = [];
let totalSites = 300;

function preload(){
    img = loadImage('MonaLisaSmall.jpg');
}

function setup(){
    createCanvas(img.width, img.height);
    background(0);
    pixelDensity(1);
    for(var i = 0; i < totalSites; i++){
        sites.push(createVector(Math.floor(random(width)), Math.floor(random(height))));
    }
    console.log(sites);

    //image(img, 0, 0);

}

function draw(){
    img.loadPixels();
    loadPixels();
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            let index = (x + y * width) * 4;    //track the pixel array of current pixel
            let currentPixel = createVector(x, y);
            let closestSite = getClosestSite(currentPixel);

            let closestSiteIndex = (closestSite.x + closestSite.y * img.width) * 4;     //track the pixel array of the nearest site of current pixel

            //assign rgba value of closestSite to the rgba value of the currentPixel
            let r = img.pixels[closestSiteIndex + 0];
            let g = img.pixels[closestSiteIndex + 1];
            let b = img.pixels[closestSiteIndex + 2];
            let a = img.pixels[closestSiteIndex + 3];

            pixels[index + 0] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
    }
    img.updatePixels();
    updatePixels();
    noLoop();
}

function distance(p1, p2){
    return abs(p1.x-p2.x)+abs(p1.y-p2.y);
}

function getClosestSite(current){
    let dist = Infinity;
    let closestSite;
    for(var i = 0; i < sites.length; i++){
        let currentDistant = distance(current, sites[i]);
        if(currentDistant < dist){
            dist = currentDistant;
            closestSite = sites[i];
        }
    }
    return closestSite;
}
