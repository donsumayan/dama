import React from 'react';
import Tile from './tile';

export default class Board extends React.Component{

	renderBoard() {
		const grid = this.props.grid;
        return grid.map((val, x) => {
            const row = val.map((v, y) => 
                <Tile 
                    key={'t'+x+y} 
                    x={x} 
                    y={y}
                    onClick={() => this.props.onClick({x,y})} />
            );

            return (
                <div key={'r'+x} className="row">
                   {row}
                </div>
            )
        })
	}

	render() {
		return (
			<div>{this.renderBoard()}</div>
		);
	}
}