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