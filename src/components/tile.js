import React from 'react';

export default function Tile(props) {
	let tileClass = 'tile';
    let colorTile1 = props.x%2===0 && props.y%2===0;
    let colorTile2 = props.x%2!==0 && props.y%2!==0;
    let piece;

    if(colorTile1 || colorTile2) {
        tileClass += ' black_tile';
    }

    switch (props.team){
        case 1:
            piece =
                <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x fa-inverse" aria-hidden="true"></i>
                </span>
            break;
        case 2:
            piece = 
                <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x " aria-hidden="true"></i>
                </span>
            break;
        case 3:
            piece = 
                <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x fa-inverse" aria-hidden="true"></i>
                    <i className="fa fa-star fa-stack-1x " aria-hidden="true"></i>
                </span>
            break;
        case 4:
            piece = 
                <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x " aria-hidden="true"></i>
                    <i className="fa fa-star fa-stack-1x fa-inverse" aria-hidden="true"></i>
                </span>
            break;
        default:
            break;
    }

    if(props.highlight) {
        tileClass += ' highlight-tile';
    }

    if(props.selected) {
        tileClass += ' selected';
    }

    return (
        <div className={tileClass} onClick={props.onClick}>
            {piece}
        </div>
    )
}