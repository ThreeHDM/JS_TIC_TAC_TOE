// El tablero vacío
var origBoard;

// El Human Player
const huPlayer = 'O';

// AI Player
const aiPlayer = 'X';

// Combos ganadores
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]


const cells = document.querySelectorAll('.cell')

startGame();

function startGame(){
    // We hide the endgame message
    document.querySelector(".endgame").style.display = "none"
    
    // Crea un array del 0 al 9
    origBoard = Array.from(Array(9).keys())
    
    //Recorre los .cells
    for(var i = 0; i < cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        //agrego un event listener a cada celda y ejecuto la función turnCLick si el user hace click
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    //type of determina si jugó ninguno de los jugadores en este lugar. Al ser number no jugó nadie
    if(typeof origBoard[square.target.id] == 'number') {
        if(!turn(square.target.id, huPlayer)){
            if(!checkTie()){
                turn(bestSpot(emptySquares().length), aiPlayer);
            }
        }
    }
}

function turn(squareId, player){
    // Le pasa el símbolo del jugador al cuadrado
    origBoard[squareId] = player;
    console.log(origBoard)
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if(gameWon) {
        gameOver(gameWon)
        return true
    }
    return false
}

function checkWin(board, player) {
    /*
   
    arr.reduce(
        callback("acumulador (A)", valorActual (E), índice (I))
        ,
        valorInicial []
        )
    */

    /*reduce()
        (a, b) son los parámetros que recibe la función, es nuestro ejemplo a = 10 y b = 20. Nuestra función retorna la suma de ambos, es decir 30. Debido a que existen más elementos en el array, la función reduce() es invocada nuevamente, la diferencia radica en que el parámetro “a” ahora es igual a 30 (representa el monto acumulado) y “b” es el elemento restante en el array, es decir 30. Al concretarse la operación el resultado que será mostrado en consola es ahora igual a 60.
    */
    
    //Plays es una array que devuelve dónde jugó el jugador.
    let plays = board.reduce(
        //funcion acumuladora
        /*
        a -> acumulador: es el valor del cada elemento del array acumulado 
        b -> valor actual: es el valor del array ahora. Puede ser el símbolo del jugador o un número
        c -> indice: es el key/indice del array donde estoy parado. Es siempre un número
         */
        (a, e, i) => (e === player) ? a.concat(i) : a // 1er param de reduce
        ,
        [] // 2do param de reduce
    );// cierre de reduce
    
    
       /* 
       El forof: ejecuta un bloque de código para cada elemento de un objeto iterable
        for (variable of iterable){
            //bloque de codigo
        }

        for (i of "Moli"){
            i+= "e";
            console.log(i)
        }
            // Me
            // oe
            // le
            // ie
       */

       /*
        The entries() method returns an Array Iterator object with key/value pairs.

        For each item in the original array, the new iteration object will contain an array with the index as the key, and the item value as the value:

        [0, "Banana"]
        [1, "Orange"]
        [2, "Apple"]
        [3, "Mango"]
       */
       
       /*
       .
        */
       
       
      
      //let arr = ["a", "b", "c"]
      //console.log(arr.indexOf("c"));
      
       let gameWon = null;

       function nombreFuncion(elem){
        //console.log("el elem es: " + elem)
        //console.log("array plays es: " + plays)
        //console.log("el indice del elemento es: " + plays.indexOf(elem))
        return plays.indexOf(elem) > -1
    }

       for (let [index, win] of winCombos.entries()) {
           //Index es el key del Array Iterator
           //console.log(index);
           //win es el array ganador de esta iteración
           //console.log(win);
           
        /*
        .every() revisa cada elemento del array y ejecuta una función. 
        Determina si todos los elementos en el array satisfacen una condición.
        */

        
        if (win.every(nombreFuncion)) {
            console.log("entró al if de Game WON");
            gameWon = {index: index, player: player};
            
            break;
        };
        //console.log("no entró al if");
    }
    return gameWon;
}

function gameOver(gameWon) {
    console.log("test");
    
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You loose!");
        
}

/******************BASIC AI **************** */

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares(){
    let squareEmpty = origBoard.filter(s => typeof s == 'number');
    console.log("esto es empty squares " + squareEmpty)
    return  squareEmpty;
}

function bestSpot(length) {
    index = Math.floor((Math.random() * length))
    console.log("el indice es:" + index);
    return emptySquares()[index];
}

function checkTie(){
    if(emptySquares().length == 0){
        for (var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

/******************BASIC AI **************** */


/*
    Arrow Function
    const add = (a, b) => (a + b)

    Is equivalent to

    const add = (a, b) => {
        return a + b;
    }

    When you use the() after your => it just automatically returns the values inside.

    const moli = (x, y) => (x+y);

    console.log(moli(1,2) )
    */

    /*
    Ternary operator

    var foo;
    if(x){
        foo = algo
    } else {
        foo = otra
    }

    var foo = (x) ?  "valor verdadero" : "valor falso";
*/