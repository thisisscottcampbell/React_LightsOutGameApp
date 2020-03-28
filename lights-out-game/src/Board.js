import React, { Component } from 'react';
import Cell from "./Cell";
import './Board.css';

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
    flipCell(r, c); 
    flipCell(r, c - 1); 
    flipCell(r, c + 1); 
    flipCell(r - 1, c); 
    flipCell(r + 1, c);


    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board: board, hasWon: hasWon })
  }

  render() {
    if(this.state.hasWon) {
      return (
        <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">You</span>
            <span className="neon-blue">Win</span>
          </div>
        </div>
      )
    }
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
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {tableBoard}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board;

