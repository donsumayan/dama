import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import {bindActionCreators}  from 'redux';
import {connect} from 'react-redux';
import {selectTile, startNewGame, undoMove } from '../actions/boardActions';
import Tile from './tile';

class Dama extends React.Component {
    renderTile(tiles, x){
        return tiles.map((piece, y) => {
            const validMove = this.props.validMoves.filter((m) => m.x===x&&m.y===y).length > 0;
            return (
                <div key ={x+y} onClick={() => this.props.selectTile({x,y})}>
                    <Tile 
                        pos={{x,y}} 
                        piece={piece} 
                        selected={this.props.selectedPiece}
                        validMove={validMove} /> 
                </div>
            )
        })
    }

    renderBoard(){
        const board = this.props.board;
        return board.map((tiles, x) => {
            return (
                <div className="row" key={x}>{this.renderTile(tiles, x)}</div>
            )
        })
    }

    renderHistory(){
        const history = this.props.history.map((history, index) => {
            return <li key={index}>{index}</li>
        });

        return <ul>{history}</ul>
    }

    render() {
        return (
            <div className="game">
                <Button bsStyle="primary" onClick={() => this.props.startNewGame()}>New Game</Button>
                {this.renderBoard()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        board: state.BoardReducer.board,
        selectedPiece: state.BoardReducer.selectedPiece,
        validMoves: state.BoardReducer.validMoves,
        history:state.BoardReducer.history,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
            {
                selectTile,
                startNewGame,
                undoMove
            }
            ,dispatch
        )
}

export default connect(mapStateToProps, matchDispatchToProps)(Dama);
