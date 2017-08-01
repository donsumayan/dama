import React from 'react';

function Tile(props) {
    return (
        <button className="tile" onClick={props.onClick}>
            {props.x}:{props.y}
        </button>
    )
}

export default class extends React.Component {
    constructor(){
        super();
        this.state = {
            grid: Array(8).fill(Array(8).fill(null)),
        }
    }

    handleClick(x,y){
        console.log('class click', x, y)
    }

    renderRow() {
        const grid = this.state.grid;
        return grid.map((val, x) => {
            const row = val.map((v, y) => 
                <Tile 
                    key={'t'+x+y} 
                    x={x} 
                    y={y} 
                    onClick={() => this.handleClick(x,y)} />
            );

            return (
                <div key={'r'+x} className="row">
                    {row}
                </div>
            )
        })
    }

    renderTile(){

    }

    render() {
        return (
            <div className="game">
                {this.renderRow()}
            </div>
        );
    }
}
