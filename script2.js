// listening the key strokes and reatcing after them
let cross = true;
let audioGameOver = new Audio("gameover.mp3");
let audio = new Audio("music.mp3");

setTimeout(() => {
  audio.play();
  console.log("audio playing");
}, 1000);

document.onkeydown = function (e) {
  console.log(e.key);

  if (e.key === "ArrowUp") {
    const dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 1000);
  } else if (e.key === "ArrowRight") {
    const dino = document.querySelector(".dino");
    let dinox = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );

    dino.style.left = dinox + 20 + "px";
  } else if (e.key === " ") {
    window.location.reload();
  } else if (e.key === "ArrowLeft") {
    const dino = document.querySelector(".dino");
    let dinox = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinox - 20 + "px";
  }
};

let scoreCont = document.querySelector("#scoreCont");

const updateScore = function (score) {
  scoreCont.innerHTML = `Your score ${score}`;
};

let score = 0;

const body = document.getElementsByTagName("body")[0];
const gameContainer = document.querySelector(".gameContainer");

setInterval(() => {
  dino = document.querySelector(".dino");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  const dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );

  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  const offSetX = Math.abs(dx - ox);
  const offSetY = Math.abs(dy - oy);

  //   console.log(offSetX, offSetY);

  if (offSetX < 73 && offSetY < 52) {
    gameOver.style.visibility = "visible";
    // debugger;
    obstacle.classList.remove("obstacleAni");
    gameOver.innerHTML = "Game Over You Lost";
    gameOver.style.color = "red";
    audioGameOver.play();
    setTimeout(() => {
      audio.pause();
      audioGameOver.pause();
    }, 1500);
    score = 0;
  } else if (offSetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
  }
}, 100);
