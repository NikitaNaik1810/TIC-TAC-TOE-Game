let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector('#resetbtn');
let newGameBtn=document.querySelector('#newbtn');
let msgContainer=document.querySelector('.msg-container');
let msg=document.querySelector('#msg');

let turnO=true;
let count=0;

let winningCombos=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add('hide'); 
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations!, winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

checkWinner=()=>{
    for(let pattern of winningCombos){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!="" && pos1Val===pos2Val && pos2Val===pos3Val){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
            showWinner(pos1Val);
            return true;
            }
        }
    }
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
    if(turnO){
        box.innerText="O";
        turnO=false
        box.style.color = "#7D3B00"; // Change color for O
    }else{
        box.innerText="X";
        turnO=true;
    }  
    box.disabled=true;
    count++;
    let isWinner=checkWinner();
    if(count===9 && !isWinner){
        gameDraw();
    }
    });
});

const gameDraw=()=>{
    msg.innerText="Game Draw!";
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

newGameBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);