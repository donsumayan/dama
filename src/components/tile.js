import React from 'react';

export default function Tile(props) {
	let tileClass = 'tile';
    let colorTile1 = props.x%2===0 && props.y%2===0;
    let colorTile2 = props.x%2!==0 && props.y%2!==0;
    if(colorTile1 || colorTile2) {
        tileClass += ' black_tile';
    }

    return (
        <div className={tileClass} onClick={props.onClick}>
            {props.haspiece? <i className="fa fa-circle fa-3x" aria-hidden="true"></i>: <div/>}
        </div>
    )
}