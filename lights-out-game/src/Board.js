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

  flipCellsAround = (keyCoord) => {
    console.log("SPIN IT!")
    let {numOfCols, numOfRows} = this.props;
    let board = this.state.board;
    let [r, c] = keyCoord.split("-").map(Number);

    let flipCell = (r, c) => {
      if (c >= 0 && c < numOfCols && r >= 0 && r < numOfRows) {
        board[r][c] = !board[r][c];
      }
    }
    flipCell(r, c);
    flipCell(r, c - 1);
    flipCell(r, c + 1);
    flipCell(r - 1, c);
    flipCell(r + 1, c)
    let hasWon = false;
    this.setState({ board: board, hasWon: hasWon })
  }

  render() {
    let tableBoard=[];
    for (let r = 0; r < this.props.numOfRows; r++) {
      let row = [];
      for (let c = 0; c < this.props.numOfCols; c++) {
        let keyCoord = `${r}-${c}`;
        row.push(<Cell key={keyCoord} isLit={ this.state.board[r][c]} flipCellsAroundMe={() => this.flipCellsAround(keyCoord)} />)
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




