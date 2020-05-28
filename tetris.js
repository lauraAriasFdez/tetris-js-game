/*BLOCKS POSSIBLE*/
class Block{
    constructor(matrix,color){
        this.matrix = matrix;
        this.color = color;  
    }
    getGrid (){
        return this.matrix;
    }
    drawBlock(brush,offset){
        this.matrix.forEach((row,x) => {
            row.forEach((val,y) =>{
                if (val!=0){
                    brush.fillStyle = this.color;
                    brush.fillRect(offset[0]+y,offset[1]+x,1,1);
                }  
            });
        });
    }
}

/*PERSON PLAYING*/
class Person{
    constructor (x=5, y=0){
        this.position = [x,y];
        this.block;
    }

    setBlock(matrix) {
        this.block = matrix;
    }


    setPosition (a,b){
        this.position = [a,b];
    }
}

/* GAAAAAMEEEE*/
{
/////////VARIABLE DEFINITION////////////////////////////////////////////////////////////////////
    //create matrix
    var colorTetris = [];
    var matrixTetris = [];

    function createMatrix(){
        colorTetris = [];
        matrixTetris = [];
        for (var i =0; i<30;i++){
            let row = [];
            let rowColor = [];
            for (var j = 0; j<15;j++){
                row.push(0);
                rowColor.push("black");
            }
            colorTetris.push(rowColor);
            matrixTetris.push(row);
        }
    }
     /*initialize variables and blocks matrix*/
     let blockElements = [
        new Block ([[0,0,0,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]],"orange"),
        new Block ([[0,0,0,0],[1,1,0,0],[1,1,0,0],[0,0,0,0]],"yellow"),
        new Block([[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],"green"),
        new Block ([[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],"magenta"),
        new Block([[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],"red"),
        new Block ([[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]], "cyan") ,
        new Block ([[0,0,0,0],[1,0,0,0],[1,1,1,0],[0,0,0,0]],"pink")
    ];

     /*main variables*/
     let tetris = document.getElementById("game-grid");
     let brush = tetris.getContext("2d");
     let player = new Person (6,-4);
     let ended = false;
 
     /*next Block player will use*/
     let nextBlock;
     let nextBlockDisplay = document.getElementById("piece");
     let nextBlockBrush = nextBlockDisplay.getContext("2d");
     
 
     /*variables needed to end and start the game */
     let finish = document.getElementById("end");
     let text = document.getElementById("text");
     let pScore = document.getElementById("txt-score");
     let lineTxt = document.getElementById("Num-lines");
     let finalScore = document.getElementById("end-score");
     let finalLines = document.getElementById("end-lines");
     let quitButton = document.getElementById("quit");
     let pauseButton = document.getElementById("pause");
     let start = document.getElementById("start");
     /*points*/
     let points = 0;
     let lines = 0;
 
     /*automatic down*/
     let downAuto;


     //START GAME
     //startGame();


     //////GAME EVENT LISTNER FOR KEYS/////////////////////////////////////////////////////////////////////////////////////////////////////
    //Event listner
    function endGame (){
        clearInterval(downAuto);
        pauseButton.innerHTML = "PAUSE";
        document.removeEventListener("keydown",eventListenerEvent);
        tetris.style.opacity = 0.4;
        /*finish screen*/
        finalScore.innerHTML = "SCORE :" + points;
        finalLines.innerHTML = "LINES: "+lines;
        finish.style.display = "flex";
        finish.style.justifyContent = "center";
        finish.style.alignItems = "center";
        text.style.display = "none";
        
        /*play again*/
        //playAgainButton.onClick (playAgain);
    }
    function eventListener(event){
        //update pastPosition
        switch(event){
            case "ArrowRight":
                if (rigthAllowed())
                     moveRight();
                break;
             case "ArrowLeft":
                 if (leftAllowed())
                     moveLeft();
                 break;
             case "ArrowUp":
                 rotate();
                 break;
             case "ArrowDown":
                 if (checkBlock())
                     moveDown();
                 else{
                    BlockIntoMatrix();
                    
                     //generate a random block
                     player.setBlock(new Block (nextBlock.matrix,nextBlock.color)); //new Block so orientation does not change
                     player.setPosition(6,-4);
                     nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
                     drawNextBlock(nextBlockBrush,nextBlock);
                     
                     
                 }
                 break;
        }
    }
    function eventListenerEvent (event){
        event = event.key;
        eventListener(event);
    }
    function moveDown(){
        player.setPosition(player.position[0],player.position[1]+1);
    }
    function moveLeft(){
        player.setPosition(player.position[0]-1,player.position[1]);
    }
    function moveRight(){
            player.setPosition(player.position[0]+1,player.position[1]);
    }
    function rotate(){
        let grid =  player.block.getGrid();        
        let newgrid = [];

        if (player.position[1]<0)
            return true; ///////////////////////added
        

        if (player.block.color=== "cyan"){
            // matrix N x N rotation 
            for (var j=0; j<grid.length; j++){
                let i =grid.length-1;
                let row = [];
                while (i>=0){
                    row.push(grid[i][j]);
                    i--;
                }
                newgrid.push(row);
            } 
            //mutate block grid

        } else if (player.block.color!=="yellow"){
            // matrix N x N rotation but ignoring last col and top row which is always [0,0,0,0]
            newgrid.push([0,0,0,0]);
            for (var j=0; j<grid.length-1; j++){
                let i =grid.length-1;
                let row = [];
                while (i>0){
                    row.push(grid[i][j]);
                    i--;
                }
                row.push(0);
                newgrid.push(row);
            } 
        }else {
            newgrid = player.block.matrix;
        }
        
        //check if rotate moves block outside the grid on the left, right or down
        let colLeft1 = [newgrid[0][0],newgrid[1][0],newgrid[2][0],newgrid[3][0]];
        let colLeft2 = [newgrid[0][1],newgrid[1][1],newgrid[2][1],newgrid[3][1]];
        let colRight1 = [newgrid[0][3],newgrid[1][3],newgrid[2][3],newgrid[3][3]];
        let colRight2 = [newgrid[0][2],newgrid[1][2],newgrid[2][2],newgrid[3][2]];
        let rowDown1=  [newgrid[3][0],newgrid[3][1],newgrid[3][2],newgrid[3][3]];
        let rowDown2 = [newgrid[2][0],newgrid[2][1],newgrid[2][2],newgrid[2][3]];

        if (player.position[0] <0 && colLeft1.includes(1))
            player.setPosition(0,player.position[1]);
        else if (player.position[0] <0 && colLeft2.includes(1))
            player.setPosition(0,player.position[1]);

        if (player.position[0]>=12 && colRight1.includes(1))
            player.setPosition(11,player.position[1]);
        else if (player.position[0]>=12 && colRight2.includes(1))
            player.setPosition(12,player.position[1]);

        if (player.position[1]==26 && rowDown1.includes(1))
            player.setPosition(player.position[0],26);
        else if (player.position[1]==27 && rowDown2.includes(1))
            player.setPosition(player.position[0],26);

    //check if rotate creates collision with pieces already there
    let canRotate = true;
    //edge case with cyan block on the left
    if (player.position[0]==-1){
        canRotate = true;
        player.setPosition(0,player.position[1]);
    }
        
    else{
        for (let i = player.position[1]; i <newgrid.length + player.position[1];i++){
            for (let j =player.position[0]; j <newgrid[i-player.position[1]].length + player.position[0];j++){
            if (matrixTetris[i][j] == 1 && newgrid [i-player.position[1]][j-player.position[0]]==1)
                    canRotate = false;
            }
        }
    }
        if (canRotate)
            player.block.matrix = newgrid;
    }

    function checkCollision(move){
        matrix = player.block.matrix.slice();
        position = player.position;
        positionToMove = position;

        switch (move){
            case ("left"):
                positionToMove = [position[0]-1,position[1]];
                break;
            case ("right"):
                positionToMove = [position[0]+1,position[1]];
                break;
            default:
                positionToMove = [position[0],position[1]+1];
                break;
        }
                //edge cases 
            if (positionToMove[0] ==-1){
                //occurs with cyan moving left so it fits
                for (let i =0; i<matrix.length;i++){
                    positionToMove[0]=0;
                    matrix[i] = matrix[i].slice(1);
                }
            }      
            
                    //edge cases for right movement
            if (positionToMove[0] ===12 ||positionToMove[0]==13 || positionToMove[0] ==14 ){
                for (let i =0; i<matrix.length;i++){
                    matrix[i] = matrix[i].slice(0,matrix[i].length-(positionToMove[0]-11));
                }
            }
        //edge cases for down movement (delete last 26 - position y rows)
            if (positionToMove[1]== 27|| positionToMove[1]== 28 || positionToMove[1]== 29){
                matrix = matrix.slice (0,matrix.length-(positionToMove[1]-26));
            }
        //edge case at the start
        if (positionToMove[1]<=0){
            if (positionToMove[1] == -4)
                positionToMove[1]=-3;
            let a =  matrix[3+positionToMove[1]].includes(1);
            let b = matrixTetris[3+positionToMove[1]].slice(positionToMove[0],positionToMove[0]+4).includes(1);
            if (a&&b){
                endGame();
            }
            return a&&b;
        }

        for (let i = positionToMove[1]; i <matrix.length + positionToMove[1];i++){
            for (let j =positionToMove[0]; j <matrix[i-positionToMove[1]].length + positionToMove[0];j++){
               if (matrixTetris[i][j] == 1 && matrix [i-positionToMove[1]][j-positionToMove[0]]==1){
                if (position[1]==0){
                    endGame();
                    ended = true;
                    return true;//ADDED AFTER
                }
                else
                    return true;
                }
            }
        }
        return false;
    }

    function leftAllowed(){
        if (checkCollision("left"))
             return false;
         else if (player.position[0]<=20 && player.position[0] >=1)
             return true;
         else{
            let colLeft1 = [player.block.matrix[0][0],player.block.matrix[1][0],player.block.matrix[2][0],player.block.matrix[3][0]];
            let colLeft2 = [player.block.matrix[0][1],player.block.matrix[1][1],player.block.matrix[2][1],player.block.matrix[3][1]];

            if (player.position[0]==0 && !colLeft1.includes(1))
                return true;
            else if (player.position[0]==-1 && !colLeft2.includes(1))
                return true;
            return false;
         }
    }

    function rigthAllowed(){
        if (checkCollision("right"))
            return false;
        else if (player.position[0]<=10 && player.position[0] >=-1)
            return true;
        else {
            let colRight1 = [player.block.matrix[0][3],player.block.matrix[1][3],player.block.matrix[2][3],player.block.matrix[3][3]];
            let colRight2 = [player.block.matrix[0][2],player.block.matrix[1][2],player.block.matrix[2][2],player.block.matrix[3][2]];
            if (player.position[0]==11 && !colRight1.includes(1))
                return true;
            else if (player.position[0]==12 && !colRight2.includes(1))
                return true;
            return false;
        }
    }

    function checkBlock(){
        let rowDown1=  [player.block.matrix[3][0],player.block.matrix[3][1],player.block.matrix[3][2],player.block.matrix[3][3]];
        let rowDown2 = [player.block.matrix[2][0],player.block.matrix[2][1],player.block.matrix[2][2],player.block.matrix[2][3]];
       //check intersection between two blocks 
        if (checkCollision("down"))
            return false;
        else if (player.position[1]<=25)
            return true;
        else if (player.position[1]==26 && !rowDown1.includes(1))
            return true;
        else if (player.position[1]==27 && !rowDown2.includes(1))
            return true;
        return false;
   }
   
   function BlockIntoMatrix (){
    position = player.position;
    matrix = player.block.matrix.slice();
    //check if it is out of bounds from general matrix due to zeros
    if (position[0]==-1){
        position[0]=0;
        for (let i =0; i<matrix.length;i++){
            matrix[i] = matrix[i].slice(1);
        }
    }
    //edge cases for right movement
    if (position[0] ===12 ||position[0]==13 || position[0] ==14 ){
        
        for (let i =0; i<matrix.length;i++){
            matrix[i] = matrix[i].slice(0,matrix[i].length-(position[0]-11));
        }
    }
    if (position[1]<0){
        if (!matrix[3].includes(1)){
            matrix.pop();
            matrix = matrix.slice(Math.abs(position[1])-1);
        } 
        else
            matrix = matrix.slice(Math.abs(position[1]));
        position[1]=0;
    }
    //edge cases for down movement (delete last 26 - position y rows)
    if (position[1]== 27|| position[1]== 28 || position[1]== 29){
        matrix = matrix.slice (0,matrix.length- (position[1]-26))
    }

    for (let i = position[1]; i <matrix.length + position[1];i++){
        for (let j = position[0]; j <matrix[i-position[1]].length + position[0];j++){
            if (matrixTetris[i][j] == 0){
                matrixTetris[i][j] = matrix[i-position[1]][j-position[0]];
                if (matrix[i-position[1]][j-position[0]] ==1)
                    colorTetris[i][j] = player.block.color;
            }
                
        }
    }
    deleteFull();
}

function deleteFull(){
    let rows = checkFullRow();
    //update lines deleted and points
    lines+= rows.length;
    switch (rows.length){
        case 1:
            points+= 40;
            break;
         case 2:
             points +=100;
             break;
         case 3:
             points+=300;
             break;
         case 4:
             points+= 1200;
             break;
    }
 
    pScore.innerHTML = "SCORE : " + points;
    lineTxt.innerHTML = "LINES : " + lines;
    //update grid matrix
    let row = [];
    let colorRow = [];
    /*
    for (let r =0; r<rows.length;r++){
        for (let i = 0; i<matrixTetris[r].length; i++){
            matrixTetris[r][i] = 0;
            colorTetris[r][i] ="black";
        }
    }*/
    
    for (let i =0; i<matrixTetris[0].length;i++){
         row.push(0);
         colorRow.push("black");
    }
    for (j = 0; j<rows.length;j++){
        matrixTetris = matrixTetris.slice (0,rows[j]).concat(matrixTetris.slice(rows[j]+1,matrixTetris.length));
        matrixTetris.unshift(row);
        colorTetris = colorTetris.slice (0,rows[j]).concat(colorTetris.slice(rows[j]+1));
        colorTetris.unshift(colorRow);
    }
}

 /*UPDATE grid objects*/
 function checkFullRow (){
     let indexToDel = [];
     for (let i = 0; i<matrixTetris.length;i++){
         row = matrixTetris[i].slice();
         //row.pop();
         if (!row.includes(0)){
             indexToDel.push(i);
         }
     }
     return indexToDel;
 }


    /*update grid*/
        
    function draw (){      
        for (var row =0; row< matrixTetris.length; row++){
            for (var col = 0; col < matrixTetris[row].length; col++){
                brush.fillStyle = colorTetris[row][col];
                brush.fillRect(col,row,1,1);
                
            }
        }
        player.block.drawBlock(brush,player.position);

    }

    function animate(){
        draw();
        requestAnimationFrame(animate);
    }

   function drawNextBlock (nextBlockBrush,nextBlock){
        nextBlockBrush.fillStyle = 'black';
        nextBlockBrush.fillRect (0,0,200,300);
        switch (nextBlock.color){
            case "cyan":
                nextBlock.drawBlock (nextBlockBrush,[1.8,0]);
                break;
            case "yellow":
                nextBlock.drawBlock (nextBlockBrush,[2.8,0.6]);
                break;
            default:
                nextBlock.drawBlock (nextBlockBrush,[2.2,.6]);
                break;
        }
    }
 

    function pauseGame (){
        if (pauseButton.innerHTML === "PAUSE"){
            clearInterval(downAuto);
            document.removeEventListener("keydown",eventListenerEvent);
            tetris.style.opacity = 0.4;
            nextBlockDisplay.style.opacity = 0.4;
            pauseButton.innerHTML="RESUME";
        }
        else{
            pauseButton.innerHTML = "PAUSE";
            downAuto = setInterval(eventListener,500,"ArrowDown");
            document.addEventListener("keydown", eventListenerEvent);
            tetris.style.opacity = 1;
            nextBlockDisplay.style.opacity = 1;
        }
    }
    function playAgain(){
        createMatrix();
        player.setBlock( blockElements[Math.floor(Math.random() * blockElements.length)]);
        nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
        downAuto = setInterval(eventListener,500,"ArrowDown");
        document.addEventListener("keydown", eventListenerEvent);
        finish.style.display = "none";
        text.style.display = "block";
        tetris.style.opacity = 1;
        text.style.opacity = 1;
        nextBlockDisplay.style.opacity = 1;
        player.setPosition(6,-4);

        points = 0;
        lines =0;
        pScore.innerHTML = "SCORE :" + points;
        lineTxt.innerHTML = "LINES: "+lines;
        ended = false; //added after
        
        //playAgainButton.removeEventListener("click",playAgain);
    }

    function startGame (){
        createMatrix();
        brush.scale(20,5);

        let idxBlock = Math.floor(Math.random() * blockElements.length);
        player.setBlock(new Block (blockElements[idxBlock].matrix,blockElements[idxBlock].color));
        nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
        nextBlockBrush.scale(40,30);
    
        drawNextBlock(nextBlockBrush,nextBlock);
        downAuto = setInterval(eventListener,500,"ArrowDown");
        document.addEventListener("keydown",eventListenerEvent);
        animate();


        tetris.style.borderColor = "red";
        start.style.display = "none";
        text.style.display = "block";
    }

}//end of game



