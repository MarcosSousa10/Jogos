/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-plusplus */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';

const numRows = 20;
const numCols = 10;

const createEmptyBoard = () => Array.from({ length: numRows }, () => Array(numCols).fill(null));

const shapes = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
];

const getRandomShape = () => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  return shape.map(row => row.map(cell => (cell ? 'X' : null)));
};

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [shape, setShape] = useState(getRandomShape());
  const [position, setPosition] = useState({ row: 0, col: Math.floor(numCols / 2) - 1 });

  useEffect(() => {
    const interval = setInterval(() => {
      moveDown();
    }, 500);
    return () => clearInterval(interval);
  }, [board, shape, position]);

  const moveDown = () => {
    setPosition(prev => {
      const newPos = { ...prev, row: prev.row + 1 };
      if (!canMove(shape, newPos)) {
        mergeShape(shape, prev);
        const newShape = getRandomShape();
        const newPosStart = { row: 0, col: Math.floor(numCols / 2) - 1 };
        if (!canMove(newShape, newPosStart)) {
          Alert.alert('Game Over');
          setBoard(createEmptyBoard());
        } else {
          setShape(newShape);
          setPosition(newPosStart);
        }
      } else {
        return newPos;
      }
      return prev;
    });
  };

  const canMove = (shape, { row, col }) => {
    return shape.every((r, rIdx) =>
      r.every((cell, cIdx) => {
        if (!cell) return true;
        const newRow = row + rIdx;
        const newCol = col + cIdx;
        return (
          newRow >= 0 &&
          newRow < numRows &&
          newCol >= 0 &&
          newCol < numCols &&
          !board[newRow][newCol]
        );
      })
    );
  };

  const mergeShape = (shape, { row, col }) => {
    const newBoard = board.map(r => [...r]);
    shape.forEach((r, rIdx) =>
      r.forEach((cell, cIdx) => {
        if (cell) {
          newBoard[row + rIdx][col + cIdx] = cell;
        }
      })
    );
    removeFullLines(newBoard);
    setBoard(newBoard);
  };

  const removeFullLines = (newBoard) => {
    for (let r = numRows - 1; r >= 0; r--) {
      if (newBoard[r].every(cell => cell)) {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(numCols).fill(null));
      }
    }
  };

  const handleMove = (direction) => {
    setPosition(prev => {
      const newPos = {
        ...prev,
        col: prev.col + (direction === 'left' ? -1 : 1),
      };
      if (canMove(shape, newPos)) {
        return newPos;
      }
      return prev;
    });
  };

  const handleRotate = () => {
    const rotatedShape = shape[0].map((_, idx) => shape.map(row => row[idx])).reverse();
    if (canMove(rotatedShape, position)) {
      setShape(rotatedShape);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Blocos</Text>
      <View style={styles.board}>
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <View key={`${rIdx}-${cIdx}`} style={[styles.cell, { backgroundColor: cell ? '#333' : '#fff' }]} />
          ))
        )}
        {shape.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            if (!cell) return null;
            const absRow = position.row + rIdx;
            const absCol = position.col + cIdx;
            return <View key={`${absRow}-${absCol}`} style={[styles.cell, styles.activeCell, { top: absRow * 20, left: absCol * 20 }]} />;
          })
        )}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => handleMove('left')}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRotate}>
          <Text style={styles.buttonText}>Rotate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleMove('right')}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  board: {
    width: 200,
    height: 400,
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  cell: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
  },
  activeCell: {
    backgroundColor: '#333',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Tetris;
