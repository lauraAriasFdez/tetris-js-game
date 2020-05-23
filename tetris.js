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

    /*create canvas matrix;
    function createMatrix(width, height){
        let matrixTetris = [];
        for (var i =0; i<width;i++){
            let row = [];
            for (var j=0; j <height;j++){
                row.push = 0;
            }
            matrixTetris.push(row);
        }
        return matrixTetris;
    }*/

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
    let player = new Person (5,5);
    player.setBlock( blockElements[Math.floor(Math.random() * blockElements.length)]);

    /*next Block player will use*/
    let nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
    let nextBlockDisplay = document.getElementById("piece");
    let nextBlockBrush = nextBlockDisplay.getContext("2d");
    nextBlockBrush.scale(55,20);
    drawNextBlock(nextBlockBrush,nextBlock);

    
    
    
    //Event listner
   document.addEventListener("keydown",function(event){
       event = event.key;
       //update pastPosition
       switch(event){
           case "ArrowRight":
               console.log(tetris.width);
               moveRight();
               break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                rotate();
                break;
            case "ArrowDown":
                if (checkBlock())
                    moveDown();
                else{
                    console.log(player.block,player.position);
                    gridObjects. push ([player.block,player.position]);
                    //generate a random block
                    player.setBlock(nextBlock);
                    nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
                    drawNextBlock(nextBlockBrush,nextBlock);
                }
                break;
       }
   });

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
                while (i>=0){
                    row.push(grid[i][j]);
                    i--;
                }
                row.push(0);
                newgrid.push(row);
            } 
            //mutate block grid
            player.block.matrix = newgrid;
        }
        
    }

   function checkBlock(){
       //check intersection between two blocks and 
        return false;
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