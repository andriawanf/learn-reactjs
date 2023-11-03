/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onClickSquare }) {

  return <button className="square" onClick={onClickSquare}>{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    // cek jika kotak sudah ada isinya 
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = (xIsNext) ? 'X' : 'O';

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  // Menampilkan next player dan pemenang
  let status = '';
  status = winner === 'draw' ? "Game Draw" : (winner) ? 'Pemenang: ' + winner : 'Pemain Selanjutnya: ' + (xIsNext ? 'X':'O');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onClickSquare={() => handleClick(0)} />
        <Square value={squares[1]} onClickSquare={() => handleClick(1)} />
        <Square value={squares[2]} onClickSquare={() => handleClick(2)} />
        <Square value={squares[3]} onClickSquare={() => handleClick(3)} />
        <Square value={squares[4]} onClickSquare={() => handleClick(4)} />
        <Square value={squares[5]} onClickSquare={() => handleClick(5)} />
        <Square value={squares[6]} onClickSquare={() => handleClick(6)} />
        <Square value={squares[7]} onClickSquare={() => handleClick(7)} />
        <Square value={squares[8]} onClickSquare={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // Membuat array dalam array history 
  const [currentMove, setCurrentMove] = useState(0); // Untuk menyimpan data player berada di move/index ke berapa
  // Buat array kondisi sekarang seperti apa
  const currenSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
  
  // buat fungsi untuk menghandle hasil dari board
  function handlePlay(nextSquares){
    // Buat array baru yang menampung data history dari keadaan awal sampai dengan keadaan player sekarang 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // buat tombol-tombol dari hasil mapping array history
  const move = history.map((squares, index) => {
    let description = '';

    if(index > 0){
      description = 'Go to move #' + index;
    }else{
      description = 'Go to game start';
    }

    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares={currenSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {move}
        </ol>
      </div>
    </div>
  );
}

// Buat logika aturan untuk mencari pemenang

function calculateWinner(squares) {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < rules.length; i++) {
    const [a, b, c] = rules[i];

    if (squares[a] == squares[b] && squares[b] == squares[c]) return squares[a];
    if(squares.every((squares) => (squares))) return 'draw';
  }

  return false;
}
