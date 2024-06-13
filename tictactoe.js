const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#status");
const restartbtn = document.querySelector("#restart");
const wincondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentplayer = "X";
let running = false;

inintializegame();

function inintializegame(){
    cells.forEach(cell => cell.addEventListener("click",cellclicked));
    restartbtn.addEventListener("click",restart);
    statustext.textContent = `${currentplayer} 's turn`;
    running = true; 
}

function cellclicked(){
        const cellIndex = this.getAttribute("cellindex");

        if(options[cellIndex]!="" || !running){
            return;
        }

        updatecell(this,cellIndex);
        checkwinnner();
}

function updatecell(cell,index){
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}
    function changeplayer(){
        currentplayer = (currentplayer == "X") ? "O" : "X" ;
        statustext.textContent = `${currentplayer}'s turn`;
    }
function checkwinnner(){
    let roundwon = false;

    for(let i=0;i<wincondition.length;i++){
        const condition = wincondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        
        if(cellA=="" || cellB=="" || cellC==""){
            continue;
        }

        if(cellA==cellB && cellB==cellC){
            roundwon = true;
            break;
        }
    }
        if(roundwon){
            statustext.textContent=`${currentplayer} wins!`;
            running = false;
        }
        else if(!options.includes("")){
            statustext.textContent = `Draw!`;
            running = false;
        }
        else{
            changeplayer();
        }

}
function restart(){
    currentplayer = "X";
    options = ["","","","","","","","",""];
    statustext.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent ="");
    running = true;
}