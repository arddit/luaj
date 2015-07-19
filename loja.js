var plane = document.createElement("canvas");
plane.width = 1280;
plane.height = 720;
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

var macaSpeed = 2;

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
        cat.y -=macaSpeed;
    }
    if(40 in keysDown){
        cat.y +=macaSpeed;
    }
    if(37 in keysDown){
        cat.x -=macaSpeed;
    }
    if(39 in keysDown){
        cat.x +=macaSpeed;
    }
    
    if(
            cat.x <= (mouse.x + 32)
            && mouse.x <= (cat.x + 32)
            && cat.y <= (mouse.y + 32)
            && mouse.y <= (cat.y + 32)

        ){

        mouseCaught = mouseCaught + 1 // mouseCaught++
        reset();
    }

}

var reset = function(){
   cat.x = plane.width/2;
   cat.y = plane.height/2; 

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
    ctx.fillText("cat zuri miun: " + mouseCaught + "herë", 32, 32);
}


reset();
setInterval(render, 1);