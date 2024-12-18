let gameSeq = [];
let userSeq = [];
let allCols = ['red', 'blue', 'green', 'yellow'];

let level = 0;
let started = false;
let highScore = 0;
let high = document.createElement('h3');


let head = document.querySelector('h2');

document.addEventListener('keypress', function(){
    if(started == false){
        console.log('game started');
        started = true;
        

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level ++;
    head.innerText = `level ${level}` ;

    let randNum = Math.floor(Math.random() * 4);
    let randCol = allCols[randNum];
    let btn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    flashBaby(btn);
}

function flashBaby(btn){
    btn.classList.add('flash');
    setTimeout(function (){
        btn.classList.remove('flash');
    }, 250);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}
function btnPress(event) {
    event.stopPropagation(); 
    let btn = this;
    flashBaby(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

function checkAns(idx){
    // console.log('current level: ', level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        head.innerHTML = `Game over:( <br> Your score was ${level} <br> Press any key to start again.` ;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 100);
        if(highScore <= level){
            highScore = level;
            high.innerText= `Your high score : ${highScore}` ;
            document.querySelector('body').append(high);
        }
        setTimeout(resetGame, 2000);
    }
}

function resetGame(){
    started = false;
    userSeq = [];
    gameSeq = [];
    if(highScore < level){
        highScore = level;
    }
    level = 0;
}

