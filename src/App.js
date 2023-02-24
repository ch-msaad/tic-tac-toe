import React, { useState } from "react";
import "./App.css";

function App() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleSquareClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const renderSquare = (index) => {
    return (
      <div className="square" onClick={() => handleSquareClick(index)}>
        {board[index]}
      </div>
    );
  };

  const resetGame = () => {
    setPlayerOne("");
    setPlayerTwo("");
    setCurrentPlayer("X");
    setBoard(Array(9).fill(""));
    setWinner(null);
  };

  const handlePlayerSubmit = (event) => {
    event.preventDefault();
    setPlayerOne(event.target.playerOne.value);
    setPlayerTwo(event.target.playerTwo.value);
  };

  return (
    <div className="app">
      {!playerOne && !playerTwo && (
        <form className="player-form" onSubmit={handlePlayerSubmit}>
          <label>
            Player 1 (X):
            <input type="text" name="playerOne" />
          </label>
          <label>
            Player 2 (O):
            <input type="text" name="playerTwo" />
          </label>
          <button type="submit">Start Game</button>
        </form>
      )}
      {(playerOne || playerTwo) && (
        <div className="board">
          <div className="row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )}

      {winner && <div className="winner">Winner: {winner}</div>}
      {(playerOne || playerTwo) && (
        <div className="current-player">
          Current Player: {currentPlayer === "X" ? playerOne : playerTwo}
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
