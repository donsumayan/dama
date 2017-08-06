import React from 'react';

export default function Tile(props) {
    const piece = props.piece;
    const colorTile1 = props.pos.x%2===0 && props.pos.y%2===0;
    const colorTile2 = props.pos.x%2!==0 && props.pos.y%2!==0;
    
    let tileClass = 'tile';

    tileClass += colorTile1 || colorTile2 ? ' black_tile' : ' white_tile';

    if(props.selected){
        tileClass += props.selected.x ===props.pos.x && props.selected.y ===props.pos.y ? ' selected': '';
        tileClass += props.validMove? ' highlight-tile': '';
    }


    let pieceDisplay;
    switch(piece.type){
        case 'men' : 
            let teamColor='fa fa-circle fa-stack-2x ';
            teamColor +=  piece.team;
            pieceDisplay  =
                <span className="fa-stack fa-lg">
                    <i className={teamColor} aria-hidden="true"></i>
                                      
                </span>
            break;
        default:
            break;

    }

    return (
        <div className={tileClass}>
            {pieceDisplay}
        </div>
    )
}