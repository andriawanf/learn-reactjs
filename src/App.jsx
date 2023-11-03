/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onClickSquare }) {

  return <button className="square" onClick={onClickSquare}>{value}</button>;
}

export default function App() {
  // lisfting state
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // cek jika kotak sudah ada isinya 
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = (xIsNext) ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // ubah menjadi 'O' untuk player selanjutnya
  }

  const winner = calculateWinner(squares);

  // Menampilkan next player dan pemenang
  let status = '';
  status = (winner) ? 'Pemenang: ' + winner : 'Pemain Selanjutnya: ' + (xIsNext ? 'X':'O');

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

    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a];
    }
  }

  return false;
}
