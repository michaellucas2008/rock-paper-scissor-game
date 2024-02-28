let gameScore={
  wins:0,
  losses:0,
  ties:0
};
let isAutoPlaying=false;
let intervalId;
const winMessage=' You win.';
const loseMessage=' You lose.';
const tieMessage=' Tie.'
const saveState=JSON.parse(localStorage.getItem('gameScore'));

if(saveState){
  gameScore.wins=saveState.wins;
  gameScore.losses=saveState.losses;
  gameScore.ties=saveState.ties;
  document.getElementById("score-board").innerHTML=`Wins: ${saveState.wins}, Losses: ${saveState.losses}, Ties: ${saveState.ties}`;
};
updateScoreElement();

document.querySelector(`.js-rock-button`).addEventListener('click',()=>{evaluateWinner('rock');});
document.querySelector(`.js-paper-button`).addEventListener('click',()=>{evaluateWinner('paper');});
document.querySelector(`.js-scissors-button`).addEventListener('click',()=>{evaluateWinner('scissors');});
document.querySelector(`.js-reset-button`).addEventListener('click',()=>{resetScore();});
document.querySelector(`.js-auto-play-button`).addEventListener('click',()=>{autoPlay();});

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    evaluateWinner('rock');
  }
  else if(event.key==='p'){
    evaluateWinner('paper');
  }
  else if(event.key==='s'){
    evaluateWinner('scissors');
  }
  
})
function checkMoveType(moveToCheck){
  switch(moveToCheck){
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
    default:
      return 'Error';
  }
}

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(
      ()=>{
        let playerMove=Math.floor(Math.random() * 3);
        playerMoveType=checkMoveType(playerMove);
        evaluateWinner(playerMoveType);
      }, 1000
    );
    isAutoPlaying=true;
    }else{
      clearInterval(intervalId);
      isAutoPlaying=false;

    }
  }
  
function evaluateWinner(playerMove){
  let computerMove=Math.floor(Math.random() * 3);
  let computerMoveType=checkMoveType(computerMove);
  let playerMoveType=playerMove;

  if(playerMoveType===computerMoveType){
    gameScore.ties+=1;
    displayResult(playerMoveType,computerMoveType,tieMessage);
  }
  else if(playerMoveType==='rock' && computerMoveType==='paper' || playerMoveType==='paper' && computerMoveType==='scissors' || playerMoveType==='scissors' && computerMoveType==='rock'){
    gameScore.losses+=1;
    displayResult(playerMoveType,computerMoveType,loseMessage);
  }
  else{
    gameScore.wins+=1;
    displayResult(playerMoveType,computerMoveType,winMessage);
  }
  localStorage.setItem('gameScore',JSON.stringify(gameScore));
}
function displayResult(playerMoveType,computerMoveType,result){
    document.getElementById('js-match-result').innerHTML=result;
    document.getElementById('moves-played').innerHTML=`
    You 
    <img class="moves-images" src="images/${playerMoveType}-emoji.png">  
    <img class="moves-images" src="images/${computerMoveType}-emoji.png"> computer`;
    updateScoreElement();
}
function resetScore(){
  gameScore={
    wins:0,
    losses:0,
    ties:0
  } 
  updateScoreElement();
  localStorage.removeItem('gameScore',JSON.stringify(gameScore));
}

function updateScoreElement(){
  document.getElementById("score-board").innerHTML=`Wins: ${gameScore.wins}, Losses: ${gameScore.losses}, Ties: ${gameScore.ties}`;
}