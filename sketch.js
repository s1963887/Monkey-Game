
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime;


function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10)

  bananaGroup = createGroup();
  obstacleGroup = createGroup(); 
  
  score = 0
  survivalTime = 0
}


function draw() {
 background("lightgreen")
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime ,75,50);
  
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  if(keyDown("space")&& monkey.y >= 305) {
        monkey.velocityY = -14;
    }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    score = Math.round(score + 0.5);
  }

  
 drawSprites(); 
  
banana();
obstacles();
}

function banana(){
  if (frameCount % 65 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function obstacles(){
 if (frameCount % 180 === 0){
   obstacle = createSprite(400,160,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.y = 330;
   obstacle.velocityX = -4;
   obstacle.scale = 0.15;
   
  //add each obstacle to the group
  obstacleGroup.add(obstacle);
 }
}