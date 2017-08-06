export function selectTile(tile){
    return {
        type: 'SELECT_TILE',
        tile
    };
}

export function startNewGame(){
    return {
        type: 'NEW_GAME'
    };
}

export function undoMove(){
    return {
        type: 'UNDO_MOVE'
    };
}