var dog,dogImage,happyDog, database, foodS, foodStock

function preload()
{

  dogImage = loadImage("images/dogImg.png") ; 
 happyDog = loadImage("images/dogImg1.png") ; 
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,300,150,150) ; 
  dog.scale = 0.15 ; 
  dog.addImage(dogImage) ; 
  foodStock = database.ref('food');
  foodStock.on("value" , readStock) ; 
  textSize(20); 
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS) ;
    dog.addImage(happyDog);
  }

  drawSprites();

  stroke("black") ; 
  text ("FOOD REMAINING : " + foodS , 170,200); 
  textSize(15) ; 
  text ("PRESS THE UP ARROW KEY TO FEED THE DOG " , 130,10,300,20) ; 
  

}

function readStock(data){
  foodS = data.val() ; 

}

function writeStock(x){
  if(x<=0){
    x = 0 
  } else{
    x = x-1 
  }
  database.ref('/').update({
    food:x
  })
}

