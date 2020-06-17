class Form {

  constructor() {
   
    this.input = createInput("");
    this.up=createButton("UP");
    this.up.size(60,40)
    this.down=createButton("DOWN");
    this.down.size(60,40)
    this.fire=createButton("FIRE");
    this.fire.size(60,40)

    this.button = createButton('Play');
    this.scoreA=createElement('h2');
    this.scoreB=createElement('h2');
    this.rule=createElement('h4')
    this.greeting = createElement('h1');
    this.title1 = createElement('h2');
    this.title = createElement('h1');
    this.title2 = createElement('h3');
    this.reset = createButton('RESET');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.rule.hide();
  }

  display(){
    background(bg2)
    this.title.html("FIGHTER JETS ");
    this.title.position(displayWidth/2 - 280, 400);
   
     this.title1.html("Welcome To The Game World");
    this.title1.position(displayWidth/2 - 320, 560);
    this.title2.html("ENTER YOUR NAME TO PLAY!");
    this.title2.position(displayWidth/2-350, 190);

    this.input.position(displayWidth/2 - 140 , displayHeight/2 - 140);
    this.button.position(displayWidth/2 -80, displayHeight/2-100);
   
    this.reset.position(displayWidth-100,50);
    this.rule.html("RULES: Try to shoot the opponent's jet using SPACE key(or fire button) and reach the end using UP_ARROW(UP OR DOWN BUTTON)");
    this.rule.position(displayWidth/2-500,displayHeight/2+360)
    this.button.mousePressed(()=>{
      this.input.hide();
      this.rule.hide();
      this.button.hide();
      this.title2.hide();
      this.title.hide();
      this.title1.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 270, displayHeight/2);
     
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.updateJetsAtEnd(0);
      //player.updateScore(0);
      
    });
   

  }
}
