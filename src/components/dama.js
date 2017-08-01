import React from 'react';

function Tile(props) {
    let tileColor;
    let colorTile1 = props.x%2===0 && props.y%2===0;
    let colorTile2 = props.x%2!==0 && props.y%2!==0;
    if(colorTile1 || colorTile2) {
        tileColor = 'black_tile';
    }

    return (
        <button className={'tile '+ tileColor} onClick={props.onClick}>

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
                   <h4>{x}</h4> {row}
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
