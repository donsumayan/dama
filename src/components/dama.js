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

                let quadrants = this.getQuadrants(pos.x,pos.y);

                if(piece === 1){
                    for(let q of [quadrants[2],quadrants[3]]){
                        let iterator = q.entries();
                        let iteratee = iterator.next();
                        if(iteratee.value){
                            availableMoves.push(iteratee.value[1]);
                        }
                    }
                }

                if(piece === 2){
                    for(let q of [quadrants[0],quadrants[1]]){
                        let iterator = q.entries();
                        let iteratee = iterator.next();
                        if(iteratee.value){
                            availableMoves.push(iteratee.value[1]);
                        }
                    }
                }

                if(piece === 3 || piece === 4){
                    for(let q of quadrants){
                        let iterator = q.entries();
                        let done = false
                        while(!done){
                            let iteratee = iterator.next();
                            done=iteratee.done;
                            if(!done){
                                availableMoves.push(iteratee.value[1]);
                            }
                        }
                    }
                }

                for(let entry of availableMoves){
                    let entryPiece = grid[entry.x][entry.y];
                    if((piece === 1 || piece === 3) && entryPiece !== 0 && (entryPiece === 2 || entryPiece === 4)){

                        let nx = pos.x>entry.x ? entry.x-1:entry.x+1;
                        let ny = pos.y>entry.y ? entry.y-1:entry.y+1;
                        if(nx>=0 && nx<8 && ny>=0 && ny<8 && grid[nx][ny] === 0) {
                            availableMoves.push({x:nx,y:ny});
                        }
                        killList.push(entry);
                    }

                    if((piece === 2 || piece === 4) && entryPiece !== 0 && (entryPiece === 1 || entryPiece === 3)){
                        let nx = pos.x>entry.x ? entry.x-1:entry.x+1;
                        let ny = pos.y>entry.y ? entry.y-1:entry.y+1;
                        if(nx>=0 && nx<8 && ny>=0 && ny<8 && grid[nx][ny] === 0) {
                            availableMoves.push({x:nx,y:ny});
                        }
                        killList.push(entry);
                    }
                }

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
                                grid[rmX][rmY] = 0;
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

    getQuadrants(startX,startY){
        let quadrants = [[],[],[],[]];

        let x = startX;
        let y = startY;

        while(x>0 && y<7){
            x--;
            y++;
            quadrants[0].push({x,y})                   
        }

        x = startX;
        y = startY;

        while(x>0 && y>0){
            x--;
            y--;
            quadrants[1].push({x,y})    
        }

        x = startX;
        y = startY;

        while(x<7 && y>0){
            x++;
            y--;
            quadrants[2].push({x,y})    
        }

        x = startX;
        y = startY;

        while(x<7 && y<7){
            x++;
            y++;
            quadrants[3].push({x,y})    
        }

        return quadrants;
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
