/*BLOCKS POSSIBLE*/
class Block{
    constructor(matrix,color){
        this.matrix = matrix;
        this.color = color;
    }
    
    drawBlock(brush,offset){
        console.log(offset);
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
        new Block ([[0,0,0,0],[0,0,1,0],[1,1,1,0]],"orange"),
        new Block ([[0,0,0,0],[1,1,0,0],[1,1,0,0]],"yellow"),
        new Block([[0,0,0,0],[0,1,1,0],[1,1,0,0]],"green"),
        new Block ([[0,0,0,0],[0,1,0,0],[1,1,1,0]],"magenta"),
        new Block([[0,0,0,0],[1,1,0,0],[0,1,1,0]],"red"),
        new Block ([[0,0,0,0],[0,0,0,0],[1,1,1,1]], "cyan") ,
        new Block ([[0,0,0,0],[1,0,0,0],[1,1,1,0]],"pink")
    ];

    let tetris = document.getElementById("game-grid");
    let brush = tetris.getContext("2d");
    let player = new Person (5,5);
    player.setMatrix( blockElements[0]);
    //console.log("person",player.position);
    brush.scale(12,5);

    
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
                moveDown();
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
    }

   
    /*update grid*/
    
    animate();
    
    function draw (){
        brush.fillStyle = "black";
        brush.fillRect(0,0,tetris.width , tetris.height);
        player.matrix.drawBlock(brush,player.position);
    }

    function animate(){
        draw();
        requestAnimationFrame(animate);
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