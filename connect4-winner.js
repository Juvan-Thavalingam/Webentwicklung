module.exports = { connect4Winner }

function connect4Winner (player, testBoard){
    boardlength = testBoard.length - 1

    for (let x = boardlength; x >= 0; x--){
        for (let y = 0; y <= testBoard.length; y++){
            //row
            if(testBoard[x][y] === player && y <= 3){
                //testRow(player, testBoard)
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
                if(y <= 3){
                    if (testBoard[x][y] === testBoard[x-1][y+1] && testBoard[x-1][y+1] === testBoard[x-2][y+2] &&
                        testBoard[x-2][y+2] === testBoard[x-3][y+3]){
                        return true;
                    }
                } else if (y >= 3){
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