var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var score=0;
var form, player, game,home;

var jets,jet1,jet2,g1,g2,rankB;

var bg,bg2, jet1_img, jet2_img,bb;

function preload(){
 bg=loadImage("images/bg.jpg")
 bg2=loadImage("images/space.jpg")
 jet1_img=loadImage("images/jet2.png")
 jet2_img=loadImage("images/jet1.png")
 bb=loadImage("images/bullet.png");
 b1=loadImage("images/bullet1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

 g1=new Group();
  g2=new Group();

}


function draw(){
  
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if(g1.collide(jet2)){
    player.score--;
   g1.destroyEach();
  
  }
  if(g2.collide(jet1)){
    player.score--;
    g2.destroyEach();
    
  }
}
