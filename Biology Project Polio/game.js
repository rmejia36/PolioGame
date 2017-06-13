'use strict'

const FRAME_RATE = 30;
var body;
var game;
var loader;
var panImg;
var playerImg = [];
var canvasBg;
var imgLoaded;
var gameRunning;

window.addEventListener('load', preload(wait)); //with loader
//+++++++++++++++++++++++++++++++++++++++++ game loop
function setup(){
  body = document.body;
  loader = document.getElementById('loader');
  game = new Game();
  runStartPanel();
  gameRunning = false;
  loader.style.display = 'none';
  body.style.display = 'block'
  window.setTimeout(draw, 100);
}
function draw(){
  if(gameRunning){
    game.run();
  }
  window.setTimeout(draw, 1000/FRAME_RATE);
}
//++++++++++++++++++++++++++++++++++++++ JSON Data
var textJSON = '{"text":{"l0":"Move with arrow keys","l1":"Avoid green Viruses","l2":"Infected people release viruses","l3":"after a while they become parilyzed","l4":"See how long you can last"}}';
var textCount = 5;
var readJSON = JSON.parse(textJSON);
//++++++++++++++++++++++++++++++++++++++++ global functions
function preload(f){
  imgLoaded = 0;
  document.body.style.backgroundImage = 'url("resources/images/virusbg.jpg")';
  //load panel image
  panImg = new Image();
  panImg.addEventListener('load', function(){imgLoaded++});
  panImg.src = 'resources/images/poliovirus.png';
  //load canvas background
  canvasBg = new Image();
  canvasBg.addEventListener('load', function(){imgLoaded++});
  canvasBg.src = 'resources/images/gamebg.jpg';
  //load player sprites
  for(let i = 0; i < 4; i++){
    playerImg.push(new Image());
    playerImg[i].addEventListener('load', function(){imgLoaded++});
    playerImg[i].src = 'resources/images/player'+i+'.png';
  }
  //after images load
  window.setTimeout(f, 500);
}

function wait(){
  if(imgLoaded >= 6){
    for(let i = 0; i < 4; i++){
      playerImg[i].removeEventListener('load', function(){imgLoaded++});
    }
    window.setTimeout(setup, 100);
  }else{
    window.setTimeout(wait, 1000/FRAME_RATE);
  }
}
function runStartPanel(){
  var startPan = document.createElement('div');
  startPan.style.backgroundImage = 'url('+panImg.src+')';
  startPan.setAttribute('id', 'startPan');
  startPan.innerHTML = "POLIO GAME";
  body.appendChild(startPan);

  var startButt = document.createElement('button');
  startButt.setAttribute('class', 'button');
  startButt.innerHTML = "Play";
  startPan.appendChild(startButt);
  startButt.addEventListener('click', function(){
    gameRunning = true;
    body.removeChild(document.getElementById('startPan'));
    body.appendChild(game.canvas);
    game.infoBar.style.display = 'block';
    game.canvas.style.display = 'block';
  });

  var infoButt = document.createElement('button');
  infoButt.setAttribute('class', 'button');
  infoButt.innerHTML = "About";
  startPan.appendChild(infoButt);
  infoButt.addEventListener('click', createInfoPan, false);

  var creditButt = document.createElement('button');
  creditButt.setAttribute('class', 'button');
  creditButt.innerHTML = "Creds";
  startPan.appendChild(creditButt);
  creditButt.addEventListener('click', createCreditPan, false);
}
function createInfoPan(){
  body.removeChild(document.getElementById('startPan'));
  var infoPan = document.createElement('div');
  infoPan.setAttribute('id', 'infoPan');
  body.appendChild(infoPan);
  var h1 = document.createElement('h1');
  h1.innerHTML = "What is Polio?";
  var p1 = document.createElement('p');
  p1.innerHTML = "Polio is a disease that attacks the spinal cord which can lead to "+
  "severe </br> paralysis and "+
  "in extreme cases death.</br></br>"+
  "Polio mainly affects infants and children as a result of poor hygine.</br></br>"+
  "In the early 1900s there were many Polio epidemics "+
  "around the world.</br></br>Prior to the release of the vaccine in the mid 1950s "+
  "approximately </br>30,000 people a year were affected by polio in the US alone.</br></br>"+
  "Polio is caused by the Poliovirus.</br></br>"+
  "Poliovirus is a normal virus and is a member of a family of viruses</br> called the Picornaviridae.</br></br>"+
  "As a result of the vaccine, Polio has been practically eradicated. </br></br>There were 0 reported cases in the US as of 2015.";
  var h2 = document.createElement('h1');
  h2.innerHTML = "Symptoms and Transmission";
  var p2 = document.createElement('p');
  p2.innerHTML = "People infected with Polio do not exhibit symptoms, but of those that do "+
  "have </br>flu-like symptoms such as sore throat, fever, headache, and nausea.</br></br>"+
  "Polio only affect humans, therefore it is transmitted through close </br>contact with infected people, "+
  "contact with an infected person's feces,</br> and through sneezes and coughing.</br></br>"+
  "Infected people are only contageous for 1 to 2 weeks after symptoms appear.</br></br>"+
  "Infected people without symptoms can spread virus too.</br></br>"+
  "The best way to prevent contracting Polio is to get vaccinated</br> and to have good hygine.";

  infoPan.appendChild(h1);
  infoPan.appendChild(p1);
  infoPan.appendChild(h2);
  infoPan.appendChild(p2);

  var backButt = document.createElement('button');
  backButt.setAttribute('class', 'button');
  backButt.innerHTML = "Back";
  infoPan.appendChild(backButt);
  backButt.addEventListener('click', function(){
    body.removeChild(infoPan);
    runStartPanel();
  });
}
function createCreditPan(){
  body.removeChild(document.getElementById('startPan'));
  var creditPan = document.createElement('div');
  creditPan.setAttribute('id', 'infoPan');
  body.appendChild(creditPan);  var h1 = document.createElement('h1');
  h1.innerHTML = "Credits";
  var p1 = document.createElement('p');
  p1.innerHTML = "Game by: Rodrigo Mejia.</br></br>"+
  "Sources used:</br>";

  var a1 = document.createElement('a');
  a1.innerHTML = "Centers for Disease Control</br></br>";
  a1.setAttribute("href", "https://www.cdc.gov/polio/about/");
  a1.setAttribute("target", "_blank");
  a1.style.color = "lightblue";

  var a2 = document.createElement('a');
  a2.innerHTML = "Virology</br></br>";
  a2.setAttribute("href", "http://www.virology.ws/2004/08/18/poliovirus/");
  a2.setAttribute("target", "_blank");
  a2.style.color = "lightblue";

  var a3 = document.createElement('a');
  a3.innerHTML = "World Health Organization</br>";
  a3.setAttribute("href", "http://www.who.int/topics/poliomyelitis/en/");
  a3.setAttribute("target", "_blank");
  a3.style.color = "lightblue";

  var p2 = document.createElement('p');
  p2.innerHTML = "</br>Shouts out to Darmanin for the assignment.";

  creditPan.appendChild(h1);
  creditPan.appendChild(p1);
  creditPan.appendChild(a1);
  creditPan.appendChild(a2);
  creditPan.appendChild(a3);
  creditPan.appendChild(p2);

  var backButt = document.createElement('button');
  backButt.setAttribute('class', 'button');
  backButt.innerHTML = "Back";
  infoPan.appendChild(backButt);
  backButt.addEventListener('click', function(){
    body.removeChild(creditPan);
    runStartPanel();
  });
}
function createStatusDivs(){
  var backButt = document.createElement('button');
  backButt.setAttribute('class', 'quit');
  backButt.innerHTML = "Back";
  game.infoBar.appendChild(backButt);
  backButt.addEventListener('click', game.reset, false);

  var timeDiv = document.createElement('div');
  timeDiv.setAttribute('class', 'infoDiv');
  timeDiv.setAttribute('id', 'time');
  timeDiv.innerHTML = "Time:</br>"+game.time;

  var scoreDiv = document.createElement('div');
  scoreDiv.setAttribute('class', 'infoDiv');
  scoreDiv.setAttribute('id', 'score');
  scoreDiv.innerHTML = "Score:</br>"+game.score;

  game.infoBar.appendChild(timeDiv);
  game.infoBar.appendChild(scoreDiv);

  game.startTime = Date.now()/1000;
  game.divsCreated = true;
}
function createSickPeople(n){
  for(let i = 0; i < n; i++){
    game.sickPeople.push(new SickPerson(game));
  }
}
function runEndPan(){
  game.play = false;
  game.canvas.style.display = 'none';
  document.getElementById('infoBar').style.display = 'none';

  var end = document.createElement('div');
  end.style.backgroundImage = 'url('+panImg.src+')';
  end.innerHTML = "Game Over"
  end.setAttribute('id', 'endPan');
  body.appendChild(end);

  var backButt = document.createElement('button');
  backButt.setAttribute('class', 'quit');
  backButt.style.display = 'block';
  backButt.style.margin = 'auto';
  backButt.innerHTML = "Again";
  end.appendChild(backButt);
  backButt.addEventListener('click', function(){
    body.removeChild(end);
    game.reset();
  }, false);
}
//++++++++++++++++++++++++++++++++++++++ event handlers
function handleCanvasClick(){
  game.openTextCount++;
  if(game.openTextCount < textCount || game.openingText[game.openTextCount]){
    var infoBar = document.getElementById('infoBar');
   infoBar.innerHTML = game.openingText[game.openTextCount];
  }else{
   game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
   document.getElementById('infoBar').innerHTML = '';
   document.getElementById('infoBar').style.textShadow = '2px 2px white';
   game.canvas.removeEventListener('click', handleCanvasClick, false);
   createStatusDivs();
   createSickPeople(5);
   game.play = true;
  }
}
//++++++++++++++++++++++++++++++++++++++ game class
 class Game{
   constructor(){
     this.canvas = document.createElement('canvas');
     this.context = this.canvas.getContext('2d');
     this.canvas.setAttribute('width', '1000px');
     this.canvas.setAttribute('height', '600px');
     this.canvas.style.backgroundImage = 'url('+canvasBg.src+')';
     this.canvas.style.backgroundPosition = 'center';
     this.canvas.style.position = 'relative';
     this.canvas.style.top = "20px";
     this.canvas.style.margin = 'auto';
     this.canvas.style.display = 'block';
     this.canvas.innerHTML = "Browser Does Not Support HTML Canvas";
     this.play = false;
     this.time = 0;
     this.startTime = 0;
     this.score = 0;
     this.speed = 15;
     this.divsCreated = false;
     this.clickImg = new Image();
     this.clickImg.src = "resources/images/click.png";
     this.sickPeople = [];
     this.createInfoBar();
     this.createStatusBar();

     this.player = new Player(this.context, this);
     window.addEventListener('keydown', function(e){
       if(game.play){
         switch(e.keyCode){
           case 38:     //up
           game.player.loc.y -= game.speed;
           game.player.img = 0;
           break;

           case 40:     //down
           game.player.loc.y += game.speed;
           game.player.img = 1;
           break;

           case 37:     //left
           game.player.loc.x -= game.speed;
           game.player.img = 2;
           break;

           case 39:     //right
           game.player.loc.x += game.speed;
           game.player.img = 3;
           break;
       }
     }}, false);
   }
   run(){
     this.context.drawImage(this.clickImg, this.canvas.width/2 - 50,
       this.canvas.height/2 - 50, 100, 100);
     if(this.play){
       this.update();
       this.render();
     }
   }
   createInfoBar(){
     this.infoBar = document.createElement('div');
     this.infoBar.setAttribute('id', 'infoBar');
     this.infoBar.style.color = '#D7EF48';
     this.infoBar.innerHTML = "Click for instructions";
     body.appendChild(this.infoBar);
   }
   createStatusBar(){
     this.openTextCount = -1;
     this.openingText = [readJSON.text.l0, readJSON.text.l1, readJSON.text.l2,
       readJSON.text.l3, readJSON.text.l4];
     this.canvas.addEventListener('click', handleCanvasClick, false);
   }
   update(){
     if(this.divsCreated){
       this.time = Math.round(Date.now()/1000 - this.startTime);
       document.getElementById('score').innerHTML = "Score:</br>"+this.score;
       document.getElementById('time').innerHTML = "Time:</br>"+this.time;
     }
     if(this.time%15 == 0){
       window.setTimeout(createSickPeople(1), 1000);
     }
     for(let i = 0; i < this.sickPeople.length; i++){
       if(this.sickPeople[i].loc.dist(this.player.loc) <= 20){
         game.play = false;
         game.sickPeople = [];
         window.setTimeout(runEndPan, 100);
       }
     }
   }
   render(){
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     this.player.run();
     for(let i = 0; i < this.sickPeople.length; i++){
       this.sickPeople[i].run();
     }
   }
   reset(){
     location.reload();
   }
 }
//+++++++++++++++++++++++++++++++++++++++++++++++ player class
class Player{
  constructor(ctx, game){
    this.ctx = ctx;
    this.width = 50;
    this.loc = vector2d(game.canvas.width/2-this.width/2,
      game.canvas.height/2-this.width/2);
    this.angle = 0*Math.PI/2;
    this.img = 0;
  }
  run(){
    this.ctx.drawImage(playerImg[this.img], this.loc.x, this.loc.y, this.width, this.width);
    this.checkEdges();
  }
  checkEdges(){
    if(this.loc.x < 0)this.loc.x = game.canvas.width-this.width;
    if(this.loc.y < 0)this.loc.y = game.canvas.height-this.width;
    if(this.loc.x > game.canvas.width-this.width)this.loc.x = 0;
    if(this.loc.y > game.canvas.height-this.width)this.loc.y = 0;
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++ sickperson class
class SickPerson{
  constructor(game){
    this.game = game;
    this.img = new Image();
    this.img.src = 'resources/images/virus.png';
    this.width = 50;
    this.loc = vector2d(Math.random(0, 1000), Math.random(0, 800));
    this.vel = vector2d(8, Math.random());
  }
  run(){
    this.checkEdges();
    this.render();
    this.update();
  }
  checkEdges(){
    if(this.loc.x < 0||this.loc.x>this.game.canvas.width-this.width){
      this.vel.x*=-1;
    }
    if(this.loc.y < 0||this.loc.y>this.game.canvas.height-this.width){
      this.vel.y*=-1;
    }
  }
  update(){
    this.loc.add(this.vel);
  }
  render(){
    var ctx = this.game.context;
    ctx.drawImage(this.img, this.loc.x, this.loc.y, this.width, this.width);
  }
}
