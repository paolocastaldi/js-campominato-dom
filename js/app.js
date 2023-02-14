const startGameButton = document.getElementById("start-game");
let isGameOver = false;
let bombe;

startGameButton.addEventListener(
    "click",
    startGame
)

// LANCIO GIOCO
function startGame() {
    const difficultyEl = document.getElementById("difficulty");
    const gridEl = document.getElementById("grid");

    isGameOver = false;

    generaGriglia(gridEl, difficultyEl.value);
}


// GENERATORE GRIGLIA DINAMICA
function generaGriglia(grid, difficolta) {
    grid.innerHTML = "";

    let squareNumber = 49

    if (difficolta == 1) {
        squareNumber = 100;
    } else if (difficolta == 2) {
        squareNumber = 81;
    }

    bombe = generaBombe(1, squareNumber);
    console.log(bombe)

    for (let i = 0; i < squareNumber; i++) {
        const testoCella = i + 1;
        const cellaEl = generaCella(testoCella, difficolta, squareNumber);
        grid.append(cellaEl);
    }
}

// GENERATORE CELLA DINAMICA

function generaCella(testo, difficolta, squareNumber) {
    const cella = document.createElement("div");
    cella.classList.add("square");

    if (difficolta == 2) {
        cella.classList.add("medium-square");
    } else if (difficolta == 3) {
        cella.classList.add("big-square");
    }

    cella.innerHTML = testo;
    cella.setAttribute("data-index", testo);

    cella.addEventListener(
        "click",
        function () {

            if (!isGameOver) {
                // PRENDO L'INDICE DELLA CELLA CORRENTE
                const cellIndex = parseInt(this.getAttribute("data-index"));

                // PRENDO TUTTE LE CELLE CLICCATE
                const activeSquares = document.querySelectorAll(".square.active");

                // SE LA CELLA CLICCATA è UNA BOMBA
                if (bombe.includes(cellIndex)) {

                    // DO LA CLASSE BOMBA E TERMINO IL GIOCO
                    this.classList.add("bomb");
                    gameOver(activeSquares, false);
                } else {

                    // ALTRIMENTI DO LA CLASSE ACTIVE
                    this.classList.add("active");
                }

                // SE ERA L'ULTIMA CELLA CLICCABILE
                console.log(activeSquares.length);
                console.log(squareNumber - bombe.length);

                if (activeSquares.length == squareNumber - bombe.length - 1) {
                    gameOver(activeSquares, true);
                }
            }
        }
    );

    return cella;
}


// GENERA ARRAY CASUALE 16 BOMBE

function generaBombe(min, max) {
    const arrayBombe = [];

    while (arrayBombe.length < 16) {
        const randomNumber = Math.floor(Math.random() * max - min + 1) + min;

        if (!arrayBombe.includes(randomNumber)) {
            arrayBombe.push(randomNumber);
        }
    }

    return arrayBombe;
}

// FUNZIONE FINE GIOCO

function gameOver(activeSquares, userWon) {
    isGameOver = true;

    console.log(activeSquares);
    if (userWon) {
        alert("Congratulazione, hai vinto!\nHai totalizzato " + activeSquares.length + " punti.");
    } else {
        alert("Peccato, hai perso!\nHai totalizzato " + activeSquares.length + " punti.");
    }

    const squares = document.querySelectorAll(".square");

    for (const square of squares) {
        const squareIndex = parseInt(square.getAttribute("data-index"));
        if (bombe.includes(squareIndex)) {
            square.classList.add("bomb");
        }
    }
}