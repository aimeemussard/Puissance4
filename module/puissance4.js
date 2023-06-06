class game{

    constructor(rows, cols, nameP1, colorP1, nameP2, colorP2){
        this.rows = rows;
        this.cols = cols;
        this.player1 = nameP1;
        this.colorP1 = colorP1;
        this.player2 = nameP2;
        this.colorP2 = colorP2;
    }

    makeBoard(){

        console.log(this.rows)
        console.log(this.cols)
        console.log(this.player1)
        console.log(this.player2)
        console.log(this.colorP1)
        console.log(this.colorP2)

        let currPlayer = this.player1;
        let styleP1 = document.createElement("style");
        document.head.appendChild(styleP1);
        styleP1.sheet.insertRule(`.P1 {background: ${this.colorP1}; border-radius: 50%; margin: 0% 1%; height: 100%;}`);

        let styleP2 = document.createElement("style");
        document.head.appendChild(styleP2);
        styleP2.sheet.insertRule(`.P2 {background: ${this.colorP2}; border-radius: 50%; margin: 0% 1%; height: 100%;}`);


        let board = [];
        let currCol = [];

        let divHeading = document.createElement("div")
        let heading = document.createElement("h1")
        heading.textContent = "PUISSANCE 4"
        divHeading.classList.add("title")
        divHeading.appendChild(heading)

        let divSubHeading = document.createElement("div")
        let subHeading = document.createElement('h2')
        subHeading.innerHTML = `<span id="${this.player1}" style="color: ${this.colorP1}; font-size: 1.5rem;">${this.player1}</span> | VS |  <span id="${this.player2}">${this.player2}</span>`;
        divSubHeading.appendChild(subHeading)

        let head = document.createElement('div')
        head.appendChild(divHeading)
        head.appendChild(divSubHeading)

        let body = document.createElement('div')
        body.classList.add("game")

        for (let r = 1; r <= this.rows; r++) {
            let $row = [];
            let row = document.createElement('div');
            row.setAttribute("id", `row${r}`);
            let rowHeight = (100/this.rows)-2;
            row.style.height = `${rowHeight}%`;
            row.classList.add("row");

            for (let c = 1; c <= this.cols; c++) {
                if (r < this.rows) {
                    $row.push(' ');
                }else {
                    currCol.push(`${this.rows - 1}`);
                    $row.push(' ');
                }
                let tile = document.createElement('div');
                let tileWidth = (100/this.cols)-2;
                tile.style.width = `${tileWidth}%`;
                tile.classList.add("tile");
                let colIndex = String.fromCharCode(64 + c);
                tile. setAttribute("id", `${colIndex}-${r}`);
                tile.addEventListener("click", () => {
                    let coords = tile.id.split("-");
                    let row = (parseInt(coords[1]) - 1);
                    let col = (parseInt(coords[0].toString().charCodeAt()-64) - 1);

                    board[row][col] = currPlayer;
                    //let tile = dcoument.getElementById(row.toString() + "-" + col.toString());
                    if(currPlayer == this.player1){
                        tile.classList.remove("tile");
                        tile.classList.add("P1");
                        currPlayer = this.player2;
                        document.getElementById(`${this.player1}`).setAttribute("style", "color: black; font-size: 1rem;")
                        document.getElementById(`${this.player2}`).setAttribute("style", `color: ${this.colorP2}; font-size: 1.5rem;`)
                    } else {
                        tile.classList.remove("tile");
                        tile.classList.add("P2");
                        currPlayer = this.player1;
                        document.getElementById(`${this.player1}`).setAttribute("style", `color: ${this.colorP1}; font-size: 1.5rem;`)
                        document.getElementById(`${this.player2}`).setAttribute("style", "color: black; font-size: 1rem;")
                    }
                    console.log(board);
                })
                row.appendChild(tile);
            }
            board.push($row);
            body.appendChild(row);
        }
        let container = document.querySelector('div');
        container.appendChild(head)
        container.appendChild(body);
    }
}

function setPiece(){

    let coords = this.id.split("-");
    console.log(coords);
    let row = parseInt(coords[1]);
    let col = coords[0];
    console.log(row);
    console.log(col);

    let tile = this;
    if(currPlayer == this.player1){
        tile.classList.remove("tile");
        tile.classList.add("P1");
        currPlayer = this.player2;
    } else {
        tile.classList.remove("tile");
        tile.classList.add("P2");
        currPlayer = this.player1;
    }
}

window.onload = function gameStart(){
    let container = document.querySelector('div')
    let form = document.createElement('div')
    form.setAttribute("id", "form")

    let divTitle = document.createElement("div")
    let title = document.createElement("h1")
    title.textContent = "PUISSANCE 4"
    divTitle.classList.add("title")
    divTitle.appendChild(title)


    /* GRID BOARDGAME */

    let divGrid = document.createElement('div')

    let labelRows = document.createElement("label")
    labelRows.setAttribute("for", "rows")
    labelRows.textContent = "Nombre de lignes"
    let inputRows = document.createElement("input")
    inputRows.setAttribute("type", "number")
    inputRows.setAttribute("name", "rows")
    inputRows.setAttribute("id", "rows")
    inputRows.setAttribute("min", "4")
    let divRows = document.createElement("div")
    divRows.setAttribute("id", "input-rows-container")
    divRows.appendChild(labelRows)
    divRows.appendChild(inputRows)
    divGrid.appendChild(divRows)


    let labelCols = document.createElement("label")
    labelCols.setAttribute("for", "cols")
    labelCols.textContent = "Nombre de colonnes"
    let inputCols = document.createElement("input")
    inputCols.setAttribute("type", "number")
    inputCols.setAttribute("name", "cols")
    inputCols.setAttribute("id", "cols")
    inputCols.setAttribute("min", "4")
    let divCols = document.createElement("div")
    divCols.setAttribute("id", "input-cols-container")
    divCols.appendChild(labelCols)
    divCols.appendChild(inputCols)
    divGrid.appendChild(divCols)


    /* PLAYER 1 */

    let divP1=document.createElement('div')

    let labelNameP1 = document.createElement("label")
    labelNameP1.setAttribute("for", "nameP1")
    labelNameP1.textContent = "Joueur 1"
    divP1.appendChild(labelNameP1)

    let inputNameP1 = document.createElement("input")
    inputNameP1.setAttribute("placeholder", "Pseudo")
    inputNameP1.setAttribute("type", "text")
    inputNameP1.setAttribute("name", "nameP1")
    inputNameP1.setAttribute("id", "nameP1")

    let inputColorP1 = document.createElement("input")
    inputColorP1.setAttribute("type", "color")
    inputColorP1.setAttribute("name", "colorP1")
    inputColorP1.setAttribute("id", "colorP1")
    inputColorP1.setAttribute("value", "#FF0000")

    let subDivP1 = document.createElement("div")
    subDivP1.appendChild(inputNameP1)
    subDivP1.appendChild(inputColorP1)
    divP1.appendChild(subDivP1)


    /* PLAYER 2 */

    let divP2=document.createElement('div')

    let labelNameP2 = document.createElement("label")
    labelNameP2.setAttribute("for", "nameP2")
    labelNameP2.textContent = "Joueur 2"
    divP2.appendChild(labelNameP2)

    let inputNameP2 = document.createElement("input")
    inputNameP2.setAttribute("placeholder", "Pseudo")
    inputNameP2.setAttribute("type", "text")
    inputNameP2.setAttribute("name", "nameP2")
    inputNameP2.setAttribute("id", "nameP2")

    let inputColorP2 = document.createElement("input")
    inputColorP2.setAttribute("type", "color")
    inputColorP2.setAttribute("name", "colorP2")
    inputColorP2.setAttribute("id", "colorP2")
    inputColorP2.setAttribute("value", "#FFFF00")

    let subDivP2 = document.createElement("div")
    subDivP2.appendChild(inputNameP2)
    subDivP2.appendChild(inputColorP2)
    divP2.appendChild(subDivP2)


    /* BUTTON */
    let buttonDiv = document.createElement('div')
    let button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("id", "play")
    button.textContent = "Commencer la partie"
    buttonDiv.appendChild(button)

    form.appendChild(divTitle)
    form.appendChild(divGrid)
    form.appendChild(divP1)
    form.appendChild(divP2)
    form.appendChild(buttonDiv)
    container.appendChild(form)

    let playButton = document.getElementById("play")
    playButton.addEventListener("click", () => {
        let rowsValue = document.getElementById("rows").value
        let colsValue = document.getElementById("cols").value
        let nameP1Value = document.getElementById("nameP1").value
        let nameP2Value = document.getElementById("nameP2").value
        let colorP1Value = document.getElementById("colorP1").value
        let colorP2Value = document.getElementById("colorP2").value
        if (colorP1Value == colorP2Value) {
            alert("Veuillez choisir des couleurs différentes !")
        } else if (rowsValue !== null && rowsValue !== "" && colsValue !== null && colsValue !== "" && nameP1Value !== "" && nameP1Value !== null && nameP2Value !== "" && nameP2Value !== null){
            document.getElementById("form").remove();
            let startGame = new game(rowsValue, colsValue, nameP1Value, colorP1Value, nameP2Value, colorP2Value);
            startGame.makeBoard();
            
        } else {
            alert("Veuillez compléter les champs manquants!")
        }
    })
}