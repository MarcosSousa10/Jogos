import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        <View style={styles.boardRow}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
    color: '#555',
  },
  board: {
    width: '80%',
    aspectRatio: 1,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: '33.33%',
    height: '100',
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
