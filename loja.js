var rrafshi = document.createElement("canvas");
rrafshi.width = 1280;
rrafshi.height = 720;
document.body.appendChild(rrafshi);

var ctx = rrafshi.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
}
bgImage.src = "images/background.png";


var macaReady = false
var maca = {};

var macaSpeed = 2;

var macaImage = new Image();
macaImage.onload = function(){
    macaReady = true;
}

macaImage.src = "images/cat.png";


var miuReady = false;
var miu = {};
var miuCaught = 0;

var miuImage = new Image();
miuImage.onload = function(){
    miuReady = true;
}
miuImage.src = "images/mouse.png";

var keysDown = {};

addEventListener("keydown",function (e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
    delete keysDown[e.keyCode];
}, false);

var update = function(){
    if(38 in keysDown){
        maca.y -=macaSpeed;
    }
    if(40 in keysDown){
        maca.y +=macaSpeed;
    }
    if(37 in keysDown){
        maca.x -=macaSpeed;
    }
    if(39 in keysDown){
        maca.x +=macaSpeed;
    }
    
    if(
            maca.x <= (miu.x + 32)
            && miu.x <= (maca.x + 32)
            && maca.y <= (miu.y + 32)
            && miu.y <= (maca.y + 32)

        ){

        miuCaught = miuCaught + 1 // miuCaught++
        reset();
    }

}

var reset = function(){
   maca.x = rrafshi.width/2;
   maca.y = rrafshi.height/2; 

                   //maximum 412 + 32
                   //minimumi 0 + 32
   miu.x = 32 + (Math.random()*(rrafshi.width - 100));
   miu.y = 32 + (Math.random()*(rrafshi.height - 100));
}


var render = function(){
    if (bgReady) { ctx.drawImage(bgImage, 0, 0); }
    if (macaReady) { ctx.drawImage(macaImage, maca.x, maca.y); }
    if (miuReady) { ctx.drawImage(miuImage, miu.x, miu.y); }
    update();
                    // color white
    ctx.fillstyle = "rbg(250, 250, 250)";
    ctx.font = "24px Helvatica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Maca zuri miun: " + miuCaught + "herë", 32, 32);
}


reset();
setInterval(render, 1);