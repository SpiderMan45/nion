//variables

var

  sword, sword_img, fruits_1, fruits_2, fruits_3, fruit_1_img, fruit_2_img, fruit_gp, monster_gp, monster, monster_img, score = 0;

//variables

var fruit_obj, fruit_gp, enemy1, gameState = "play",
  gameOver, gameOver_img, sound_1, sound_2;

//preloading image

function preload() {
  //loading Image

  sword_img = loadImage("sword.png");
  fruit_img_1 = loadImage("fruit1.png");
  fruit_img_2 = loadImage("fruit2.png");
  fruit_img_3 = loadImage("fruit3.png");
  fruit_img_4 = loadImage("fruit4.png");
  monster_img = loadImage("alien1.png")
  gameOver_img = loadImage("gameover.png")
  sound_1 = loadSound("knifeSwoosh.mp3");
  sound_2 = loadSound("gameover.mp3")
}

//function setup
function setup() {

  createCanvas(400, 400);

  //making groups and dispalying sword
  sword_1();
  fruit_gp = new Group();
  monster_gp = new Group();
}

//drawing
function draw() {

  background("lightblue")

  //score board  
  text("score" + score, 300, 60);
  //gameStates(for game)  
  if (gameState === "play") {
    fruits();
    enemy();
    sword.y = World.mouseY
    sword.x = World.mouseX

    if (monster_gp.isTouching(sword)) {

      gameState = "gameOver"
      sound_2.play();
      gameEnd();

    }


    //if fruit is touching sword then it will die and will play sound  
    if (fruit_gp.isTouching(sword)) {
      fruit_gp.destroyEach();
      sound_1.play();
      score = score + 1

      gameEnd.visible = false;

    }
  } else if (gameState === "gameOver") {
    score = 0
    gameEnd.visible = true;


  }
  drawSprites();
}





function sword_1() {

  sword = createSprite(10, 10, 10, 10);

  sword.addImage("swords", sword_img);

  sword.scale = 0.6

}

function fruits() {

  if (World.frameCount % 80 === 0) {
    fruit_obj = createSprite(400, 250, 10, 10);
    fruit_obj.scale = 0.2
    var e = Math.round(random(1, 2));

    if (e === 1) {
      fruit_obj.velocityX = (7 + (score / 4));
      fruit_obj.x = 10

    } else if (e === 2) {
      fruit_obj.velocityX = -(5 + (score / 10));
    }

    fruit_obj.lifetime = 400 / 6

    fruit_obj.y = Math.round(random(50, 340));

    r = Math.round(random(1, 4));

    if (r == 1) {

      fruit_obj.addImage(fruit_img_1);

    } else if (r == 2) {

      fruit_obj.addImage(fruit_img_2);

    } else if (r == 3) {

      fruit_obj.addImage(fruit_img_3);

    } else {

      fruit_obj.addImage(fruit_img_4);

    }
    fruit_gp.add(fruit_obj);

  }

}

function enemy() {
  if (World.frameCount % 200 === 0) {
    enemy1 = createSprite(10, 10, 10, 10);
    enemy1.addImage(monster_img);
    var a = Math.round(random(1, 2))
    if (a === 1) {
      enemy1.velocityX = -(6 + (score / 10))
      enemy1.x = 400
    } else if (a === 2) {
      enemy1.velocityX = (6 + (score / 10))

    }



    enemy1.y = Math.round(random(1, 100));
    enemy1.lifetime = 400 / 6
    monster_gp.add(enemy1);

  }
}

function gameEnd() {
  gameOver = createSprite(200, 200, 20, 20);
  gameOver.addImage(gameOver_img);


}