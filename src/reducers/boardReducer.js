const initialState = {
    board:Array(8).fill(Array(8).fill({type:undefined})),
    selectedPiece: {},
    validMoves: [],
    history: [],
    previousGames:[]
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'RESET_GRID':
            state = {...state, grid:Array(8).fill(Array(8).fill(0))};
            break;
        case 'NEW_GAME':
            let newBoard = Array(8).fill(Array(8).fill({}));

            const black = {team:'black', type:'men'};
            const white = {team:'white', type:'men'};

            newBoard[0] = newBoard[0].map((p,i) => {return p = i%2===0? black : p});
            newBoard[1] = newBoard[1].map((p,i) => {return p = i%2!==0? black : p});
            newBoard[2] = newBoard[2].map((p,i) => {return p = i%2===0? black : p});
            newBoard[3] = newBoard[3].map((p,i) => {return {}});
            newBoard[4] = newBoard[4].map((p,i) => {return {}});
            newBoard[5] = newBoard[5].map((p,i) => {return p = i%2!==0? white : p});
            newBoard[6] = newBoard[6].map((p,i) => {return p = i%2===0? white : p});
            newBoard[7] = newBoard[7].map((p,i) => {return p = i%2!==0? white : p});

            state ={
                ...state, 
                board:newBoard, 
                history:[]
            };
            break;
        case 'SELECT_TILE':
            let selectedPiece = {...state.selectedPiece};
            let availableMoves = [];
            let currentBoard = [...state.board];
            let history = [...state.history];

            if(history[history.length] !== JSON.stringify(currentBoard)){
                history.push(JSON.stringify(currentBoard))
            }


            let targetPiece = currentBoard[action.tile.x][action.tile.y];

            if(targetPiece.type !== undefined){
                selectedPiece = {
                    ...selectedPiece, 
                    x:action.tile.x,
                    y:action.tile.y,
                    type:targetPiece.type,
                    team:targetPiece.team,
                }
            } else {
                if(selectedPiece){
                    const validMove = (state.validMoves.filter((m) => {
                        return m.x===action.tile.x && m.y===action.tile.y
                    })).length > 0 ;

                    if(validMove){
                        currentBoard[action.tile.x][action.tile.y] = {...selectedPiece, x:undefined,y:undefined}
                        currentBoard[selectedPiece.x][selectedPiece.y] = {};
                        const jumpedTiles = getJumpedTiles(selectedPiece, action.tile);

                        jumpedTiles.forEach((tile) => {
                            currentBoard[tile.x][tile.y] = {}
                        })

                        selectedPiece = null;

                    }
                        // selectedPiece = {...selectedPiece, x:action.tile.x, y:action.tile.y};
                    
                }
            }

            if(selectedPiece){
                let quadrants = getQuadrants(selectedPiece.x,selectedPiece.y);

                if(selectedPiece.type === 'men'){
                    for(let q of quadrants){
                        let iterator = q.entries();
                        let iteratee = iterator.next();
                        
                        let moveSpace = !iteratee.done? iteratee.value[1]: false;

                        if(moveSpace){
                            let occupant = currentBoard[moveSpace.x][moveSpace.y];

                            if(occupant.team !== selectedPiece.team && occupant.type!==undefined){
                                availableMoves = getNextTile(selectedPiece, moveSpace, availableMoves, currentBoard)
                            } else {
                                const restrictBlack = selectedPiece.team === 'black' && moveSpace.x>selectedPiece.x;
                                const restrictWhite = selectedPiece.team === 'white' && moveSpace.x<selectedPiece.x;
                                if(restrictBlack ||restrictWhite){
                                    availableMoves.push(moveSpace)
                                }
                            }
                        }
                    }
                }
            }

            state = {...state, 
                    selectedPiece, 
                    validMoves:availableMoves,
                    board:currentBoard,
                    history
                }

            break;
        default:
            break;
    }
    return state;   
}

function getJumpedTiles(tileOrigin, tileDestination, state){

    let tilesJumped = [];
    let arrX = [];
    let arrY = [];

    const decrementX = tileOrigin.x > tileDestination.x;
    const decrementY = tileOrigin.y > tileDestination.y;

    let startX = tileOrigin.x;
    let startY = tileOrigin.y;

    while(startX !== tileDestination.x) {
        arrX.push(startX);
        startX = decrementX ? startX-1:startX+1;
    }

    while(startY !== tileDestination.y) {
        arrY.push(startY);
        startY = decrementY ? startY-1:startY+1;
    }


    arrX.forEach((x) => {
        arrY.forEach((y) => {
            if(x!==tileDestination.x && y!==tileDestination.y){
                tilesJumped.push({x,y})
            }
        })
    })

    return tilesJumped;
}

function getNextTile(selectedPiece, moveSpace, availableMoves, currentBoard){
    const nextTile = {
        x: moveSpace.x > selectedPiece.x ? moveSpace.x+1 : moveSpace.x-1,
        y: moveSpace.y > selectedPiece.y ? moveSpace.y+1 : moveSpace.y-1
    }   
    const validX = nextTile.x >= 0 && nextTile.x < 8;
    const validY = nextTile.y >= 0 && nextTile.y < 8;

    if(validX && validY && currentBoard[nextTile.x][nextTile.y].type===undefined){
        availableMoves.push(nextTile)
    }
    return availableMoves;
}


function getQuadrants(startX,startY){
    let quadrants = [[],[],[],[]];

    let x = startX;
    let y = startY;

    while(x>0 && y<7){
        x--;
        y++;
        quadrants[0].push({x,y})                   
    }

    x = startX;
    y = startY;

    while(x>0 && y>0){
        x--;
        y--;
        quadrants[1].push({x,y})    
    }

    x = startX;
    y = startY;

    while(x<7 && y>0){
        x++;
        y--;
        quadrants[2].push({x,y})    
    }

    x = startX;
    y = startY;

    while(x<7 && y<7){
        x++;
        y++;
        quadrants[3].push({x,y})    
    }

    return quadrants;
}