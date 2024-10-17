let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let bttn = ["crimson", "blueviolet", "chartreuse", "darkgreen"];

let h3 = document.querySelector('h3');

document.addEventListener("keydown", function(){
    if(started == false){
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = bttn[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

let allBtns = document.querySelectorAll('.btn');

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function btnPress(btn){
    btn = this;
    userFlash(btn);

    userSeq.push(btn.style.backgroundColor);
    matchSeq(userSeq.length-1);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function matchSeq(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 600);
        }
    }
    else{
        let score = level - 1;
        h3.innerHTML = `GAME OVER! Your score is <b>${score}</b>.<br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 2000);
        console.log("hello");

        if(score > highScore){
            highScore = score;
            alert(`Your highscore is ${highScore}`);
        }
        reset();
    }
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}