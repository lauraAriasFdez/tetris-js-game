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
           var matrixTetris = [];
           for (var i =0; i<28;i++){
               let row = [];
               for (var j = 0; j<22;j++){
                  row.push(0);
               }
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
    //let gridMatrix = createMatrix(Number.parseInt(600/15),Number.parseInt(700/6));

    /*main variables*/
    let tetris = document.getElementById("game-grid");
    let brush = tetris.getContext("2d");
    brush.scale(15,6);
    let player = new Person (8,0);
    player.setBlock( blockElements[Math.floor(Math.random() * blockElements.length)]);

    /*next Block player will use*/
    let nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
    let nextBlockDisplay = document.getElementById("piece");
    let nextBlockBrush = nextBlockDisplay.getContext("2d");
    nextBlockBrush.scale(55,20);
    drawNextBlock(nextBlockBrush,nextBlock);

    
    /*check available to move*/
    function checkCollisionLeft (){
        player.position[0]
       return false;
    }
    function leftAllowed(){
        if (checkCollisionLeft())
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

    /*check collision for avilable moves*/
    function checkCollisionRight (){
        //if colRight1 includes 1 and color of object there 
        return false;
    }

    function checkCollisionDown(){
        matrix = player.block.matrix;
        position = player.position;
        positionToMove = [position[0],position[1]+1];
        
        //bounded by 0,20
        // if tetris matrix has 1 and matrix block has one return true
        // if tetris matrix has 1 and matrix block has all zeros return false
        // if tetris matrix has all zeros return false
        
         
        for (let i = positionToMove[1]; i <matrix.length + positionToMove[1];i++){
            for (let j =positionToMove[0]; j <matrix[i-positionToMove[1]].length + positionToMove[0];j++){
               if (matrixTetris[i][j] == 1 && matrix [i-positionToMove[1]][j-positionToMove[0]]==1)
                return true;
            }
        }
        return false;
    }

    function rigthAllowed(){
        if (checkCollisionRight())
            return false;
        else if (player.position[0]<=15 && player.position[0] >=-1)
            return true;
        else {
            let colRight1 = [player.block.matrix[0][3],player.block.matrix[1][3],player.block.matrix[2][3],player.block.matrix[3][3]];
            let colRight2 = [player.block.matrix[0][2],player.block.matrix[1][2],player.block.matrix[2][2],player.block.matrix[3][2]];
            if (player.position[0]==16 && !colRight1.includes(1))
                return true;
            else if (player.position[0]==17 && !colRight2.includes(1))
                return true;
            return false;
        }
    }

    function checkBlock(){
        let rowDown1=  [player.block.matrix[3][0],player.block.matrix[3][1],player.block.matrix[3][2],player.block.matrix[3][3]];
        let rowDown2 = [player.block.matrix[2][0],player.block.matrix[2][1],player.block.matrix[2][2],player.block.matrix[2][3]];
       //check intersection between two blocks and 
       //console.log(player.position);
        if (checkCollisionDown())
            return false;
        else if (player.position[1]<=20)
            return true;
        else if (player.position[1]==21 && !rowDown1.includes(1))
            return true;
        else if (player.position[1]==22 && !rowDown2.includes(1))
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
            player.block.matrix = newgrid;

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
            player.block.matrix = newgrid;
        }

        //check if rotate moves block outside the grid on the left, right or down
        let colLeft1 = [player.block.matrix[0][0],player.block.matrix[1][0],player.block.matrix[2][0],player.block.matrix[3][0]];
        let colLeft2 = [player.block.matrix[0][1],player.block.matrix[1][1],player.block.matrix[2][1],player.block.matrix[3][1]];
        let colRight1 = [player.block.matrix[0][3],player.block.matrix[1][3],player.block.matrix[2][3],player.block.matrix[3][3]];
        let colRight2 = [player.block.matrix[0][2],player.block.matrix[1][2],player.block.matrix[2][2],player.block.matrix[3][2]];
        let rowDown1=  [player.block.matrix[3][0],player.block.matrix[3][1],player.block.matrix[3][2],player.block.matrix[3][3]];
        let rowDown2 = [player.block.matrix[2][0],player.block.matrix[2][1],player.block.matrix[2][2],player.block.matrix[2][3]];

        if (player.position[0] <=0 && colLeft1.includes(1))
            player.setPosition(0,player.position[1]);
        else if (player.position[0] <=0 && colLeft2.includes(1))
            player.setPosition(1,player.position[1]);

        if (player.position[0]>=17 && colRight1.includes(1))
            player.setPosition(16,player.position[1]);
        else if (player.position[0]>=17 && colRight2.includes(1))
            player.setPosition(17,player.position[1]);

        if (player.position[1]==21 && rowDown1.includes(1))
            player.setPosition(player.position[0],21);
        else if (player.position[1]==22 && rowDown2.includes(1))
            player.setPosition(player.position[0],21);
    }

    //Event listner
   document.addEventListener("keydown",function(event){
       event = event.key;
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
                    gridObjects. push ([new Block (player.block.matrix,player.block.color),player.position]);
                    BlockIntoMatrix(player.block.matrix,player.position,matrixTetris);
                    //generate a random block
                    player.setBlock(nextBlock);
                    player.setPosition(8,-1);
                    nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
                    drawNextBlock(nextBlockBrush,nextBlock);
                }
                break;
       }
   });


    function BlockIntoMatrix (matrix,position,matrixTetris){
        if(position[1] == -1){
            console.log ("FINISH");
            return null;
        }    
        for (let i = position[1]; i <matrix.length + position[1];i++){
            for (let j = position[0]; j <matrix[i-position[1]].length + position[0];j++){
                if (matrixTetris[i][j] == 0)
                    matrixTetris[i][j] = matrix[i-position[1]][j-position[0]];
            }
        }
        //console.table(matrixTetris);
    }
    /*update grid*/
    
    animate();
    
    function draw (){
        brush.fillStyle = "black";
        brush.fillRect(0,0,tetris.width , tetris.height);
        player.block.drawBlock(brush,player.position);

        for (var i =0; i<gridObjects.length;i++){
            gridObjects[i][0].drawBlock(brush,gridObjects[i][1]);
        }

    }

    function animate(){
        draw();
        requestAnimationFrame(animate);
    }

    function drawNextBlock (nextBlockBrush,nextBlock){
        nextBlockBrush.fillStyle = "black";
        nextBlockBrush.fillRect (0,0,200,300);
        switch (nextBlock.color){
            case "cyan":
                nextBlock.drawBlock (nextBlockBrush,[0.75,1.75]);
                break;
            case "yellow":
                nextBlock.drawBlock (nextBlockBrush,[1.60,1.75]);
                break;
            default:
                nextBlock.drawBlock (nextBlockBrush,[1.1,1.75]);
                break;
        }
       

       
        
    }



        //test, main methods
    /*
    player.block.drawBlock(brush,player.position);
    console.log(player.block, player.position);
    player.setPosition(10,10);
    console.log(player.block, player.position);
    player.block.drawBlock(brush,player.position);
*/

}