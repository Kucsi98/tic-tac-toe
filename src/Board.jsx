import Square from "./Square";
import "./App.css";
import { useState } from "react";

const Board = () => {
  const [counter, setCounter] = useState(0);
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);

    if (winnerDeclared || squareFilled) {
      return;
    }
    setCounter(counter + 1);
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //colums
      [0, 4, 8],
      [2, 4, 6],
      //diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return `Winner: ${squares[a]}`; // "x" or 'O'
      } else if (counter >= 9) {
        return "It's a draw";
      }
    }
  }

  function restartGame() {
    setSquares(initialSquares);
    setXIsNext(true);
    calculateWinner(squares);
    setCounter(0);
  }

  const winner = calculateWinner(squares);
  const status = winner ? ` ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;
  return (
    <div>
      <div className="status">{status}</div>
      <button
        style={{ display: winner ? "block" : "none" }}
        onClick={restartGame}
      >
        Restart
      </button>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
