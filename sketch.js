var dog, dog1, happyDog;
var database;
var foodS,foodStock;
var feedDog, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
   dog1 = loadImage("Images/dogImg.png");
   happyDog = loadImage("Images/dogImg1.png");
  }

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  foodObj = new Food();

  dog = createSprite(250,420,20,20);
  dog.addImage (dog1);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(13); 
  stroke("black");

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,120);
  addFood.mousePressed(addFood);
}

function draw(){
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
    }

  drawSprites();

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
   })
 }