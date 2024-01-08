import { render } from "./lib/suiweb.js"

let state = {
    board: Array(6).fill('').map(el => Array(7).fill('')),
    isRed: true,
    key: "null",
}

const URL = "http://localhost:3000/" + "api/data/" + "state" + "?api-key=c4game"


const stateSeq = []

const App = () => [Board, {board: state.board}]

const Board = ({board}) => {
    let flatBoard = [].concat(...board)
    let fields = flatBoard.map((type) => [Field, {type}])
    return (
        ["div", {className: "board"}, ...fields]
    )
}

const Field = ({type}) => {
    switch (type){
        case 'r':
            type = "red"
            break
        case 'b':
            type = "blue"
            break
        default:
            type =""
    }
    return ["div", {
        className: "field",
        onclick : "clickEvent(event)"
    },
        ["div", {
        className: `piece  ${type}`
    }]
    ]
}

function showBoard () {
    const app = document.querySelector(".app")
    const currentColor = document.getElementById("currentColor")

    render([App], app)

    if (connect4Winner('r', state.board) || connect4Winner('b', state.board)){
        disWinner()
        return
    }

    document.querySelectorAll('.field').forEach((field, index) => {
        field.addEventListener("click", event => clickEvent(event, index))
    })

    if(state.isRed){
        currentColor.classList.remove("red")
        currentColor.classList.add("blue")
        currentColor.innerText = "Blue"
    }else {
        currentColor.classList.remove("blue")
        currentColor.classList.add("red")
        currentColor.innerText = "Red"
    }

    return app
}

function disWinner(){
    alert("Win")
}

function init(){
    showBoard()
}

function clickEvent(event, index){
    let target = event.target

    if (event.target.classList.contains("piece")){
        target = target.parentElement
    }

    let hasSpace = false

    let row = 0

    const columnIndex = Array.from(target.parentNode.children).indexOf(target)

    let column = columnIndex % 7
    for(let index = 5; index >= 0; index--){
        if (state.board[index][column] === ''){
            hasSpace = true
            row = index
            break
        }
    }

    if (hasSpace){
        setBoard(row, column)
    }
    showBoard()
}
function setBoard(row, column){
    state.isRed = !state.isRed
    const newRow = setInList(state.board[row], column, nextPlayer(state));
    const newBoard = setInList(state.board, row, newRow);
    const newState = setInObj(state, "board", newBoard);
    stateSeq.push(state);
    state = newState;
}

function nextPlayer(state) {
    return state.isRed ? 'r' : 'b';
}

function setInList(lst, idx, val) {
    const copy = [...lst];
    copy[idx] = val;
    return copy;
}

function setInObj(obj, attr, val) {
    const copy = {
        ...obj
    };
    copy[attr] = val;
    return copy;
}

function loadStateFromServer() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            Object.assign(state, data)
            showBoard()
            console.log("Laden erfolgreich! ")})
        .catch(error =>{
            console.log("Fehler beim laden! ", error)
        })
}

function saveStateToServer() {
    fetch(URL, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(state)
    }).then(r =>{
        console.log("Speichern erfolgreich! ", r)
        alert("Game saved on Server!")
    }).catch(error => {
        console.log("Fehler beim speichern! ", error)
    })
}


function saveState(){
    var json = JSON.stringify(state)
    localStorage.setItem("saved", json)
    alert("Game saved!")
}

function loadState(){
    var load = localStorage.getItem("saved")

    if(load){
        try{
            state = JSON.parse(load)
            showBoard()
        }
        catch (e) {
            alert(e)
        }
    } else {
        alert("No save game found!")
    }
}
function undo(){
    if(stateSeq.length > 0){
        state = stateSeq.pop()
        state.isRed = !state.isRed
        showBoard()
    } else {
        alert("Board is Empty!")
    }
}

function reset(){
    state.board = Array(6).fill('').map(el => Array(7).fill(''))
    state.isRed = true
    showBoard()
}

function connect4Winner (player, testBoard){
    let boardlength = testBoard.length - 1

    for (let x = boardlength; x >= 0; x--){
        for (let y = 0; y <= testBoard.length; y++){
            //row
            if(testBoard[x][y] === player && y <= 3){
                if(testBoard[x][y] === testBoard[x][y+1] && testBoard[x][y+1] === testBoard[x][y+2] &&
                    testBoard[x][y+2] === testBoard[x][y+3]){
                    return true;
                }
            }
            //column
            if(testBoard[x][y] === player && x >= 2){
                if(testBoard[x][y] === testBoard[x-1][y] && testBoard[x-1][y] === testBoard[x-2][y] &&
                    testBoard[x-2][y] === testBoard[x-3][y]){
                    return true;
                }
            }

            if (testBoard[x][y] === player && x > 2){
                //right
                if(y < 4){
                    if (testBoard[x][y] === testBoard[x-1][y+1] && testBoard[x-1][y+1] === testBoard[x-2][y+2] &&
                        testBoard[x-2][y+2] === testBoard[x-3][y+3]){
                        return true;
                    }
                }

                if (testBoard[x][y] === player && y > 2){
                    if (testBoard[x][y] === testBoard[x-1][y-1] && testBoard[x-1][y-1] === testBoard[x-2][y-2] &&
                        testBoard[x-2][y-2] === testBoard[x-3][y-3]){
                        return true;
                    }
                }
            }

        }
    }
    return false;
}

window.init = init
window.undo = undo
window.reset = reset
window.savegame = saveState
window.loadgame = loadState
window.saveServergame = saveStateToServer
window.loadServergame = loadStateFromServer