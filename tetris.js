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
           //create matrix
           var colorTetris = [];
           var matrixTetris = [];

           for (var i =0; i<32;i++){
               let row = [];
               let rowColor = [];
               for (var j = 0; j<16;j++){
                  row.push(0);
                  rowColor.push("black");
               }
               colorTetris.push(rowColor);
               matrixTetris.push(row);
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

    /*gridObjects are the objects who have been position already*/
    let gridObjects = [];
    /*main variables*/
    let tetris = document.getElementById("game-grid");
    let brush = tetris.getContext("2d");
    brush.scale(20,5);
    let player = new Person (6,0);
    player.setBlock( blockElements[Math.floor(Math.random() * blockElements.length)]);

    /*next Block player will use*/
    let nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
    let nextBlockDisplay = document.getElementById("piece");
    let nextBlockBrush = nextBlockDisplay.getContext("2d");
    nextBlockBrush.scale(55,20);
    drawNextBlock(nextBlockBrush,nextBlock);

    /*automatic down*/
    let downAuto = setInterval(eventListener,500,"ArrowDown");

    function checkCollision(move){
        matrix = player.block.matrix;
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
        for (let i = positionToMove[1]; i <matrix.length + positionToMove[1];i++){
            for (let j =positionToMove[0]; j <matrix[i-positionToMove[1]].length + positionToMove[0];j++){
               if (matrixTetris[i][j] == 1 && matrix [i-positionToMove[1]][j-positionToMove[0]]==1)
                return true;
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
       //check intersection between two blocks and 
       //console.log(player.position);
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


    
       /*if postion [-1,19] and check columns that are not 0,0,0,0 and postion -2,20*/
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
            newgrid = player.block.matrix
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
    for (let i = player.position[1]; i <newgrid.length + player.position[1];i++){
        for (let j =player.position[0]; j <newgrid[i-player.position[1]].length + player.position[0];j++){
           if (matrixTetris[i][j] == 1 && newgrid [i-player.position[1]][j-player.position[0]]==1)
                canRotate = false;
        }
    }
        if (canRotate && newgrid!=[])
            player.block.matrix = newgrid;
    }

    //Event listner
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
                     gridObjects. push ([new Block (player.block.matrix.slice(),player.block.color),player.position]);
                     BlockIntoMatrix(player.block,player.position,matrixTetris);
                     //generate a random block
                     player.setBlock(nextBlock);
                     player.setPosition(8,-1);
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
   document.addEventListener("keydown",eventListenerEvent);





   function deleteFull(){
       let rows = checkFullRow();
        console.log(rows);
       //update grid matrix
       let row = [];
       let colorRow = [];
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
            row = [...matrixTetris[i]];
            row.pop();
            if (!row.includes(0)){
                indexToDel.push(i);
            }
        }
        return indexToDel;
    }

    function BlockIntoMatrix (block,position,matrixTetris){
        matrix = block.matrix;
        if(position[1] == -1){
            console.log ("FINISH");
            return null;
        }    
        for (let i = position[1]; i <matrix.length + position[1];i++){
            for (let j = position[0]; j <matrix[i-position[1]].length + position[0];j++){
                if (matrixTetris[i][j] == 0){
                    matrixTetris[i][j] = matrix[i-position[1]][j-position[0]];
                    if (matrix[i-position[1]][j-position[0]] ==1)
                        colorTetris[i][j] = block.color;
                }
                    
            }
        }
        deleteFull();
    }

    /*update grid*/
    
    animate();
    
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
                nextBlock.drawBlock (nextBlockBrush,[0,2]);
                break;
            case "yellow":
                nextBlock.drawBlock (nextBlockBrush,[1.60,1.75]);
                break;
            default:
                nextBlock.drawBlock (nextBlockBrush,[1.1,1.75]);
                break;
        }
    }
}