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

    setMatrix(matrix) {
        this.matrix = matrix;
    }


    setPosition (a,b){
        this.position = [a,b];
    }
}


{
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
    let gridObjects = [];
    let tetris = document.getElementById("game-grid");
    let brush = tetris.getContext("2d");
    let player = new Person (5,5);


    let nextBlock = blockElements[Math.floor(Math.random() * blockElements.length)];
    let nextBlockDisplay = document.getElementById("piece");
    let nextBlockBrush = nextBlockDisplay.getContext("2d");
    nextBlockBrush.scale(55,20);
    drawNextBlock(nextBlockBrush,nextBlock);

    
    player.setMatrix( blockElements[0]);
    brush.scale(15,6);

    
    //Event listner
   document.addEventListener("keydown",function(event){
       event = event.key;
       //update pastPosition
       switch(event){
           case "ArrowRight":
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
                    
                    gridObjects. push ([player.matrix,player.position]);
                    //generate a random block
                    player.setMatrix(nextBlock);
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
        console.log("rotate");
        let grid =  player.matrix.getGrid();        
        let newgrid = [];
        // for j representing the col 
        for (var j=0; j<grid.length; j++){
            let i =grid.length-1;
            let row = [];
            while (i>=0){
                row.push(grid[i][j]);
                i--;
            }
            console.log(row);
            newgrid.push(row);
        }
        //mutate block grid
        player.matrix.matrix = newgrid;
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
        player.matrix.drawBlock(brush,player.position);

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
    player.matrix.drawBlock(brush,player.position);
    console.log(player.matrix, player.position);
    player.setPosition(10,10);
    console.log(player.matrix, player.position);
    player.matrix.drawBlock(brush,player.position);
*/

}