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

  createBoard() {
    //to create board, need to loop over the number of rows and cols, and in second loop, we are creating a row of booleans and pushing onto board.

    let board = [];

    //loop through numofRows array
    for (let r = 0; r < this.props.numOfRows; r++ ) {
      //for each item in numOfRows array, create an array for the item (that row)
      let row = [];
      //for every instance of a row being created, each item in numOfRows, loop throgh the numOfCols array
      for (let c = 0; c < this.props.numOfCols; c++) {
        //idk... something about determining what is lit...
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      //add that row to the board
      board.push(row)
    }
    //this somehow is automatically set to state
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
    let tableBoard=[];
    for (let r = 0; r < this.props.numOfRows; r++) {
      let row = [];
      for (let c = 0; c < this.props.numOfCols; c++) {
        row.push(<Cell isLit={ this.state.board[r][c]} />)
      }
      tableBoard.push(<tr>{row}</tr>)
    }
   
    return (
      <table className="Board">
        <tbody>
          {tableBoard}
        </tbody>
      </table>
    )
  }
}


export default Board;




