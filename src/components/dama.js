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

        let availableMoves = [];
        if(selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y)){
            this.setState({
                validMoves:availableMoves,
                selectedPiece: null,
            })
        } else {
            if(piece !== 0 && piece !== null){
                let startX = pos.x;
                let startY = pos.y;
                let q1 = [];

                while(startX>0 && startY<7){
                    startX--;
                    startY++;
                    if(grid[startX][startY] === 0){
                        availableMoves.push({x:startX,y:startY});
                        if(piece === 3 || piece === 4) {continue;} else { break;}
                    } else {
                        if(piece === 3 && (grid[startX][startY] === 2 || grid[startX][startY] === 4)){
                            continue;
                        } else if(piece === 4 && (grid[startX][startY] === 1 || grid[startX][startY] === 3)){
                            continue;
                        } else {
                            break;
                        }
                        
                    }
                    
                }

                startX = pos.x;
                startY = pos.y;
                let q2 = [];

                while(startX>0 && startY>0){
                    startX--;
                    startY--;
                    if(grid[startX][startY] === 0){
                        availableMoves.push({x:startX,y:startY});
                    }
                    
                    if(piece === 3 || piece === 4) {continue;} else { break;}
                }

                startX = pos.x;
                startY = pos.y;
                let q3 = [];

                while(startX<7 && startY>0){
                    startX++;
                    startY--;
                    if(grid[startX][startY] === 0){
                        availableMoves.push({x:startX,y:startY});
                    }

                    if(piece === 3 || piece === 4) {continue;} else { break;}
                }

                startX = pos.x;
                startY = pos.y;
                let q4 = [];

                while(startX<7 && startY<7){
                    startX++;
                    startY++;
                    if(grid[startX][startY] === 0){
                        availableMoves.push({x:startX,y:startY});
                    }
                    
                    if(piece === 3 || piece === 4) {continue;} else { break;}
                }

                // function getMove(q, grid, availableMoves, piece) {
                //     if(q.length>0){
                //         const targetTile = grid[q[0].x][q[0].y]
                //         if(targetTile === 0){
                //             availableMoves.push(q[0])
                //         } else {
                //             console.log(targetTile)
                //             nextTile(q,grid,1,availableMoves);
                //         }
                //     }
                // }

                // function nextTile(q,grid,index,availableMoves){
                //     if(q[index]){
                //         const targetTile = grid[q[index].x][q[index].y]
                //         if(targetTile === 0){
                //             console.log(targetTile)
                //         } else {
                //             nextTile(q,grid,index+1,availableMoves)
                //         }
                //     } else {
                //         console.log(q,index)
                //     }
                // }

                // switch(piece){
                //     case 1:
                //         getMove(q3, grid, availableMoves, piece);
                //         getMove(q4, grid, availableMoves, piece);
                //         break;
                //     case 2:
                //         q1.length > 0 ? availableMoves.push(q1[0]) : false;
                //         q2.length > 0 ? availableMoves.push(q2[0]) : false; 
                //         break;
                //     case 3:
                //     case 4:
                //         if(q1.length>0){
                //             availableMoves.push(...q1);
                //         }
                //         if(q2.length>0){
                //             availableMoves.push(...q2);
                //         }
                //         if(q3.length>0){
                //             availableMoves.push(...q3);
                //         }
                //         if(q4.length>0){
                //             availableMoves.push(...q4);
                //         }
                //         break;
                //     default:
                //         break;
                    
                // }

                // movesX.forEach((mx) => {
                //     movesY.forEach((my) => {
                //         if(mx>=0 && mx<8 && my>=0 && my<8){
                //             const mpiece = grid[mx][my]; 
                //             if(mpiece !== piece || mpiece === null){
                //                 if(grid[mx][my] !== null) {
                //                     let xx = mx<x ? mx-1 : mx+1;
                //                     let yy = my<y ? my-1 : my+1;
                //                     if(xx>=0 && xx<8 && yy>=0 && yy<8){
                //                         killList.push({x:mx,y:my});
                //                         if(grid[xx][yy] === null){
                //                             availableMoves.push({x:xx,y:yy});
                //                         }   
                //                     }
                //                 } else {
                //                     if(grid[x][y] === 1 && mx>x) {
                //                         availableMoves.push({x:mx,y:my});
                //                     }
                //                     if(grid[x][y] === 2 && mx<x) {
                //                         availableMoves.push({x:mx,y:my});
                //                     }
                //                 }
                //             }
                //         }
                //     })
                // })


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
                        grid[selectedPiece.x][selectedPiece.y] = 0;
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
        grid[3] = grid[3].map((p,i) => {return 0});
        grid[4] = grid[4].map((p,i) => {return 0});
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
