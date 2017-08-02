import React from 'react';
import Tile from './tile';

export default class Board extends React.Component{

	renderBoard() {
		const grid = this.props.grid;
        return grid.map((val, x) => {
            const row = val.map((value, y) => {
                let selected = false
                let highlight = false;
                this.props.validMoves.forEach((v) =>{
                    if(v.x === x && v.y === y) {
                        highlight = true;
                    }
                })

                const selectedPiece = this.props.selectedPiece;
                if(selectedPiece!==null) {
                    selected = selectedPiece.x === x && selectedPiece.y === y;
                }

                return <Tile 
                            key={'t'+x+y} 
                            x={x} 
                            y={y}
                            highlight={highlight}
                            selected={selected}
                            team={value}
                            onClick={() => this.props.onClick({x,y})} />
            });

            return (
                <div key={'r'+x} className="row">
                   {row}
                </div>
            )
        })
	}

	render() {
		return (
			<div>
                {this.renderBoard()}
            </div>

		);
	}
}