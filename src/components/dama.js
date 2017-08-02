import React from 'react';
import Board from './board';


export default class Dama extends React.Component {
    constructor(){
        super();
        this.state = {
            grid: Array(8).fill(Array(8).fill(null)),
        }
    }

    handleClick(pos){
        console.log('class click', pos)
    }

    handleNewGame(){
        console.log('test', this.state)
    }

    render() {
        return (
            <div className="game">
                
                <button onClick={() => this.handleNewGame()}>New Game</button>
                <Board grid={this.state.grid} onClick={this.handleClick}/>
            </div>
        );
    }
}
