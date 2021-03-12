var back;
var ballooon, balloonAnim;
var database;
var position;
var size;
var state = 0;
var box;

function preload(){
  back = loadImage("background.png");
  balloonAnim = loadAnimation("Balloon1.png", "Balloon2.png", "Balloon3.png");
}

function setup() {
  createCanvas(1360,650);
  balloon = createSprite(500, 500);
  balloon.addAnimation("Balloon", balloonAnim);
  balloon.scale = 0.6;
  box = new instruc_box();
  database = firebase.database();
  var balloonPosition = database.ref("balloon/position");
  var balloonSize = database.ref("balloon/size");
  balloonPosition.on("value", readPosition, showError);
  balloonSize.on("value", readSize, showError);
}

function draw() {
  background(back);  
  if(position!==undefined){
    if(state == 1){
    if(keyDown(LEFT_ARROW))
    changePosition(-5, 0);
    if(keyDown(RIGHT_ARROW))
    changePosition(5,0);
    if(keyDown(UP_ARROW)){
    changePosition(0,-5);
      changeSize(-0.003);
    }
    if(keyDown(DOWN_ARROW)){
      changePosition(0,5);
      changeSize(0.003);
    }
  }
  }
  
  drawSprites();
  if (state == 0){
  fill(0);
  textSize(20);
  box.display();
  text("PRESS DOWN ARROW TO MOVE DOWN", 500, 450);
  text("PRESS UP ARROW TO MOVE UP",500, 400);
  text("PRESS LEFT ARROW TO MOVE LEFT", 500, 350);
  text("PRESS RIGHT ARROW TO MOVE RIGHT",500, 300);
  fill("red");
  text("PRESS SPACE TO CONTINUE", 500, 500);
  }

}

function changePosition(x,y){
  database.ref("balloon/position").set({
    "x": position.x + x,
    "y" : position.y + y
  });
}

function changeSize(scale){
  database.ref("balloon/size").set({
    "scale" : size.scale + scale
  });
}

function readSize(data){
  size = data.val();
  balloon.scale = size.scale;
  console.log(size.scale);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  console.log(position.x);
    console.log(position.y);
}

function showError(){
  console.log("ERROR READING DATABASE");
}

function keyPressed(){
  if(keyCode == 32)
  state = 1;
}