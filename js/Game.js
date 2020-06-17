class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

 jet1 = createSprite(50,displayHeight/2);
 jet1.addImage("1", jet1_img);
 jet1.scale=0.7
 jet2 = createSprite(400,displayHeight/2);
 jet2.addImage("2",jet2_img);
 jet2.scale=0.7 
    jets = [jet1, jet2];
  }

  play(){
    form.hide();
    form.up.position(displayWidth/2-100,displayHeight-100)
    form.down.position(displayWidth/2+100,displayHeight-100)
    form.fire.position(displayWidth/2,displayHeight-100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("lightblue");
      image(bg, 0,-displayHeight*3,displayWidth, displayHeight*5);
      
      //var display_position = 100;
     
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 170 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
       
        form.scoreB.html(player.name+"'s"+" Lives:"+player.score);
        //form.scoreB.html(allPlayers[plr].name + ": " + allPlayers[plr].score);

        form.scoreB.position(50,20);
        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        y = (displayHeight-50) - allPlayers[plr].distance;
        jets[index-1].x = x;
        if (index === player.index){
        stroke(10);
          fill("red");
          ellipse(x,y-40,160,160);
          if(keyDown("space")&&player.distance < 3490&&player.distance > -1050){
            if(x===170){
             var bullet=createSprite(x+187,y+45,60,10);
            bullet.velocityX=10;
            bullet.shapeColor="yellow"
            bullet.addImage("bullet1",b1);
            bullet.scale=0.5
            g1.add(bullet)
            }
            else{
            var bullet=createSprite(x-187,y+40,60,10);
            bullet.addImage("bullet",bb);
            bullet.velocityX=-10;
            bullet.shapeColor="yellow"
            bullet.scale=0.5
            g2.add(bullet)
          }}
          if(touches.length>0){
            if(player.distance < 3490&&player.distance > -1050){
              form.fire.mousePressed(()=>{
                if(x===170){
                  var bullet=createSprite(x+187,y+45,60,10);
                 bullet.velocityX=12;
                 bullet.shapeColor="yellow"
                 bullet.addImage("bullet1",b1);
                 bullet.scale=0.5
                 g1.add(bullet)
                 }
                 else{
                 var bullet=createSprite(x-187,y+40,60,10);
                 bullet.addImage("bullet",bb);
                 bullet.velocityX=-12;
                 bullet.shapeColor="yellow"
                 bullet.scale=0.5
                 g2.add(bullet)
                 }
              });
             }

              touches=[]

          }
        }
        
        
      
        x = x+(displayWidth-350);
        jets[index-1].y = y;
       

       
        if (index === player.index){
          
          
          camera.position.x = displayWidth/2;
          camera.position.y =  jets[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null&&player.distance < 3500&&player.distance >-1100){
      player.distance +=27
      player.update();
    }
   

   
    if(keyIsDown(DOWN_ARROW) && player.index !== null&&player.distance < 3500&&player.distance > -1100){
      player.distance -=27
      player.update();
    }
   if(touches.length>0){
    if(player.index !== null&&player.distance < 3500&&player.distance >-1100){

    form.up.mousePressed(()=>{
      player.distance +=27
      player.update();
    })
  }
  if( player.index !== null&&player.distance < 3500&&player.distance > -1100){
    form.down.mousePressed(()=>{
    player.distance -=27
    player.update();
  })
}


touches=[]

   }
    if(player.distance > 3495  ){
      gameState = 2;
      player.rank +=1
      Player.updateJetsAtEnd(player.rank)
      if( player.score ===3){
      form.scoreA.html("AWESOME, YOUR RANK IS : 1 ");
      form.scoreA.position(20,100);
    }
    if( player.score <=0){
      form.scoreA.html("BETTER LUCK NEXT TIME :(");
      form.scoreA.position(20,100);
    }
    if( player.score ===2){
      form.scoreA.html("WOW, YOUR RANK IS : 2 ");
      form.scoreA.position(20,100);
    }
      
    if( player.score ===1){
      form.scoreA.html("GOOD, YOUR RANK IS : 3 ");
      form.scoreA.position(20,100);
    }

    }
    if(player.distance <-1100 ){
      gameState = 2;
      player.rank +=1
      Player.updateJetsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
