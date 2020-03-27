import React, { Component } from 'react';
import Cell from "./Cell";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - numOfRows: number of rows of board
 * - numOfCols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    numOfRows: 5,
    numOfCols: 5,
    chanceLightStartsOn: 0.25
  }
  
  state = { 
    hasWon: false,
    board: this.createBoard()
  }

  createBoard (){
    //to create board, need to loop over the number of rows and cols, and in second loop, we are creating a row of booleans and pushing onto board.
    let board = [];
    
    for(let r = 0; r < this.props.numOfRows; r++) {
      let row = [];
      for (let c = 0; c < this.props.numOfCols; c++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board 
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {numOfCols, numOfRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < numOfCols && y >= 0 && y < numOfRows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    //this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    return (
    // if the game is won, just show a winning msg & render nothing else

    // TODO
      <h1>BOARD</h1>
    // make table board

    // TODO
    )
  }
}


export default Board;




