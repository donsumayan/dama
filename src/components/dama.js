import React from 'react';
import Board from './board';
import Button from 'react-bootstrap/lib/Button';
import {bindActionCreators}  from 'redux';
import {connect} from 'react-redux';
import {selectTile, startNewGame } from '../actions/boardActions';


class Dama extends React.Component {
    // handleClick(pos){
    //     const grid = this.state.grid;
    //     const selectedPiece = this.state.selectedPiece;
    //     const validMoves = this.state.validMoves;
    //     const killList = [];
    //     const x = pos.x;
    //     const y = pos.y;
    //     let piece  = grid[x][y];

    //     let availableMoves = [];
    //     if(selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y)){
    //         this.setState({
    //             validMoves:availableMoves,
    //             selectedPiece: null,
    //         })
    //     } else {
    //         if(piece !== 0 && piece !== null){

    //         } else {
    //             if(selectedPiece){
    //                 const validMove = (validMoves.filter((move) => move.x===x && move.y===y)).length > 0 ;
    //                 if (validMove) {
    //                     let piece = grid[selectedPiece.x][selectedPiece.y];
    //                     grid[selectedPiece.x][selectedPiece.y] = 0;
    //                     grid[x][y] = piece;
    //                     if(piece === 1 && x === 7) {
    //                         grid[x][y] = 3;
    //                     }
    //                     if(piece === 2 && x === 0) {
    //                         grid[x][y] = 4;
    //                     }
    //                     const rmX = x<selectedPiece.x? x+1 : x-1;
    //                     const rmY =y<selectedPiece.y? y+1 : y-1;
    //                     if(this.state.killList.length>0){
    //                         const targetFound = (this.state.killList.filter((t) => t.x === rmX && t.y === rmY)).length > 0;
    //                         if(targetFound){
    //                             grid[rmX][rmY] = 0;
    //                         }
    //                     }
    //                     this.setState({
    //                         grid:grid,
    //                         validMoves:[],
    //                         selectedPiece: null,
    //                         killList: [],
    //                     });
    //                 }
    //             }
    //         }
    //     }
    // }    

    render() {
        return (
            <div className="game">
                <Button bsStyle="primary" onClick={() => this.props.startNewGame()}>New Game</Button>
                <Board
                    grid={this.props.grid} 
                    validMoves={this.props.validMoves}
                    selectedPiece={this.props.selectedPiece}
                    onClick={(v) => this.props.selectTile(v)}
                    />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        grid: state.GridReducer.grid,
        selectedPiece: state.GridReducer.selectedPiece,
        validMoves: state.GridReducer.validMoves,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
            {
                selectTile,
                startNewGame
            }
            ,dispatch
        )
}

export default connect(mapStateToProps, matchDispatchToProps)(Dama);
