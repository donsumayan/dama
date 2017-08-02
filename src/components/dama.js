import React from 'react';
import Board from './board';
import Button from 'react-bootstrap/lib/Button';

export default class Dama extends React.Component {
    constructor(){
        super();
        this.state = {
            grid: Array(8).fill(Array(8).fill(0)),
            validMoves: [],
            selectedPiece: null,
            killList: []
        };
    }

    handleClick(pos){
        const grid = this.state.grid;
        const selectedPiece = this.state.selectedPiece;
        const validMoves = this.state.validMoves;
        const killList = [];
        const x = pos.x;
        const y = pos.y;
        let piece  = grid[x][y];
        let movesX = [];
        let movesY = [];
        let availableMoves = [];
        if(selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y)){
            this.setState({
                validMoves:availableMoves,
                selectedPiece: null,
            })
        } else {
            if(piece !== 0 && piece !== null){
                if(x-1 >= 0){
                    movesX.push(x-1);
                }
                if(x+1 <= 8){
                    movesX.push(x+1);
                }

                if(y-1 >= 0){
                    movesY.push(y-1);
                }
                if(y+1 <= 8){
                    movesY.push(y+1);
                }

                movesX.forEach((mx) => {
                    movesY.forEach((my) => {
                        if(mx>=0 && mx<8 && my>=0 && my<8){
                            const mpiece = grid[mx][my]; 
                            if(mpiece !== piece || mpiece === null){
                                if(grid[mx][my] !== null) {
                                    let xx = mx<x ? mx-1 : mx+1;
                                    let yy = my<y ? my-1 : my+1;
                                    if(xx>=0 && xx<8 && yy>=0 && yy<8){
                                        killList.push({x:mx,y:my});
                                        if(grid[xx][yy] === null){
                                            availableMoves.push({x:xx,y:yy});
                                        }   
                                    }
                                } else {
                                    if(grid[x][y] === 1 && mx>x) {
                                        availableMoves.push({x:mx,y:my});
                                    }
                                    if(grid[x][y] === 2 && mx<x) {
                                        availableMoves.push({x:mx,y:my});
                                    }
                                }
                            }
                        }
                    })
                })


                this.setState({
                    validMoves:availableMoves,
                    selectedPiece: {x,y},
                    killList:killList,
                });
            } else {
                if(selectedPiece){
                    const validMove = (validMoves.filter((move) => move.x===x && move.y===y)).length > 0 ;
                    if (validMove) {
                        let piece = grid[selectedPiece.x][selectedPiece.y];
                        grid[selectedPiece.x][selectedPiece.y] = null;
                        grid[x][y] = piece;
                        if(piece === 1 && x === 7) {
                            grid[x][y] = 3;
                        }
                        if(piece === 2 && x === 0) {
                            grid[x][y] = 4;
                        }
                        const rmX = x<selectedPiece.x? x+1 : x-1;
                        const rmY =y<selectedPiece.y? y+1 : y-1;
                        if(this.state.killList.length>0){
                            const targetFound = (this.state.killList.filter((t) => t.x === rmX && t.y === rmY)).length > 0;
                            if(targetFound){
                                grid[rmX][rmY] = null;
                            }
                        }
                        this.setState({
                            grid:grid,
                            validMoves:[],
                            selectedPiece: null,
                            killList: [],
                        });
                    }
                }
            }
        }
    }

    handleNewGame(){
        const grid = this.state.grid;
        grid[0] = grid[0].map((p,i) => {return p = i%2===0? 1 : p});
        grid[1] = grid[1].map((p,i) => {return p = i%2!==0? 1 : p});
        grid[2] = grid[2].map((p,i) => {return p = i%2===0? 1 : p});
        grid[3] = grid[3].map((p,i) => {return null});
        grid[4] = grid[4].map((p,i) => {return null});
        grid[5] = grid[5].map((p,i) => {return p = i%2!==0? 2 : p});
        grid[6] = grid[6].map((p,i) => {return p = i%2===0? 2 : p});
        grid[7] = grid[7].map((p,i) => {return p = i%2!==0? 2 : p});

        this.setState({
            grid:grid,
            validMoves:[],
            selectedPiece: null,
            killList: [],
        });
    }

    render() {
        return (
            <div className="game">
                <Button bsStyle="primary" onClick={() => this.handleNewGame()}>New Game</Button>
                <Board
                    grid={this.state.grid} 
                    validMoves={this.state.validMoves}
                    selectedPiece={this.state.selectedPiece}
                    onClick={(v) => this.handleClick(v)}/>
            </div>
        );
    }
}
