function setup() {
  level = new Level();
  newMap = new Map(15, 15);
  newHero = new Hero(20, 20, 7, 13, "blue", newMap, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 150) + 100);
  monsters = [];
  for (let i = 0; i < level.getCurrentLevel(); i++) {
    let randomX;
    let randomY;

    do {
      randomX = Math.floor(Math.random() * 13) + 1;
      randomY = Math.floor(Math.random() * 13) + 1;
    } while (newMap.checkCollision(randomX, randomY));

    monsters.push(new Monster(20, 20, randomX, randomY, "gray", newMap, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 150) + 100));
  }
  newMap.init();
  newMap.putEntity(newHero, monsters);
}

function draw() {
  document.getElementById('level-value').innerHTML = level.getCurrentLevel();
  document.getElementById('score-value').innerHTML = newMap.getScore();
  background(245, 222, 179);
  newMap.printMap();

  if (newMap.countMonsters() === 0) {
    level.setLevel();
    monsters = [];
    for (let i = 0; i < level.getCurrentLevel(); i++) {
      let randomX;
      let randomY;

      do {
        randomX = Math.floor(Math.random() * 13) + 1;
        randomY = Math.floor(Math.random() * 13) + 1;
      } while (newMap.checkCollision(randomX, randomY));

      monsters.push(new Monster(20, 20, randomX, randomY, "gray", newMap, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 150) + 100));
    }
    newMap.putEntity(newHero, monsters);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    newMap.moveHero("right");
  } else if (keyCode === LEFT_ARROW) {
    newMap.moveHero("left");
  } else if (keyCode === UP_ARROW) {
    newMap.moveHero("up");
  } else if (keyCode === DOWN_ARROW) {
    newMap.moveHero("down");
  } else if (keyCode === 13) {
    newMap.startCombat();
  }
}


class Level {
  constructor(){
    this.currentLevel = 1;
    this.latestLevel = 1;
    this.maxLevel = 3;
  }

  getCurrentLevel(){
    return this.currentLevel;
  }

  setLevel(){
    if(this.currentLevel === this.maxLevel){
      window.location.replace("finished.html");
    }else{
      this.currentLevel++;
    }
  }
}

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.score = 0;
  }

  init() {
    createCanvas(this.width * 30, this.height * 30);
    this.selectRandomMap();
  }
