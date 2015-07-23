var plane = document.createElement("canvas");
plane.width = 1024;
plane.height = 640;
document.body.appendChild(plane);

var ctx = plane.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
}
bgImage.src = "images/background.png";


var catReady = false
var cat = {};

var catSpeed = 2;

var catImage = new Image();
catImage.onload = function(){
    catReady = true;
}

catImage.src = "images/cat.png";


var mouseReady = false;
var mouse = {};
var mouseCaught = 0;

var mouseImage = new Image();
mouseImage.onload = function(){
    mouseReady = true;
}
mouseImage.src = "images/mouse.png";

var keysDown = {};

addEventListener("keydown",function (e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
    delete keysDown[e.keyCode];
}, false);

var update = function(){
    if(38 in keysDown){
        if(cat.y < 0){
            cat.y +=catSpeed;
        }
        else{
            cat.y -=catSpeed;
        }
    }
    if(40 in keysDown){
        if(cat.y < plane.height-120){
            cat.y +=catSpeed;
        }
        else{
            cat.y -=catSpeed;
        }
    }
    if(37 in keysDown){
        if(cat.x < 0){
            cat.x += catSpeed;
        }
        else{
            cat.x -=catSpeed;
        }
    }
    if(39 in keysDown){
        if(cat.x < plane.width-120){
            cat.x += catSpeed;
        }
        else{
            cat.x -=catSpeed;
        }
    }
    
    if( // checks if cat is over mouse. 32 is for size of the cat logo
            cat.x <= (mouse.x + 32)
            && mouse.x <= (cat.x + 32)
            && cat.y <= (mouse.y + 32)
            && mouse.y <= (cat.y + 32)

        ){

        mouseCaught = mouseCaught + 1 // mouseCaught++
        reset();
    }

}

var reset = function(){ // called when cat over mouse, will put cat in the middle and mouse on random
   //cat.x = plane.width/2; // will not reset cat position
   //cat.y = plane.height/2; 

                   //maximum 412 + 32
                   //minimumi 0 + 32
   mouse.x = 32 + (Math.random()*(plane.width - 100));
   mouse.y = 32 + (Math.random()*(plane.height - 100));
}


var render = function(){
    if (bgReady) { ctx.drawImage(bgImage, 0, 0); }
    if (catReady) { ctx.drawImage(catImage, cat.x, cat.y); }
    if (mouseReady) { ctx.drawImage(mouseImage, mouse.x, mouse.y); }
    update();
                    // color white
    ctx.fillstyle = "rbg(250, 250, 250)";
    ctx.font = "24px Helvatica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("The cat has caught the mouse " + mouseCaught + " times.", 32, 32);
}


reset();
setInterval(render, 1);
cat.x = plane.width/2; // places cat at start
cat.y = plane.height/2; 

