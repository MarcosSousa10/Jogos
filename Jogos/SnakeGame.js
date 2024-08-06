/* eslint-disable react/style-prop-object */
/* eslint-disable no-lonely-if */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import {
  StyleSheet, Text, View, TouchableOpacity, Vibration, Alert,
  Button,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const BOARD_SIZE = 20;
const INIT_SNAKE = [{ x: 2, y: 2 }];
const INIT_DIRECTION = { x: 1, y: 0 };
const INIT_FOOD = { x: 5, y: 5 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INIT_SNAKE);
  const [direction, setDirection] = useState(INIT_DIRECTION);
  const [food, setFood] = useState(INIT_FOOD);
  const [isGameOver, setIsGameOver] = useState(false);
  const intervalRef = useRef(null);
  const onGestureEvent = (event) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Deslize horizontal
      if (translationX > 50) {
        setDirection({ x: 1, y: 0 });
      } else if (translationX < -50) {
        setDirection({ x: -1, y: 0 });
      }
    } else {
      // Deslize vertical
      if (translationY > 50) {
        setDirection({ x: 0, y: 1 });
      } else if (translationY < -50) {
        setDirection({ x: 0, y: -1 });
      }
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // O gesto terminou
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(moveSnake, 200);
    return () => clearInterval(intervalRef.current);
  }, [snake, direction]);

  const moveSnake = () => {
    if (isGameOver) return;
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;
    if (head.x === food.x && head.y === food.y) {
      newSnake.unshift(head);
      setFood({ x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) });
      playSound(require('../assets/Sons/vitoria.mp3'));
    } else {
      newSnake.pop();
      if (isCollision(head)) {
        setIsGameOver(true);
        clearInterval(intervalRef.current);
        playSound(require('../assets/Sons/derrota.mp3'));
        Alert.alert('Game Over', 'The snake collided!');
      } else {
        newSnake.unshift(head);
      }
    }
    setSnake(newSnake);
  };

  const isCollision = (head) => {
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  async function playSound(soundFile) {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    Vibration.vibrate();
  }

  const handleReset = () => {
    setSnake(INIT_SNAKE);
    setDirection(INIT_DIRECTION);
    setFood(INIT_FOOD);
    setIsGameOver(false);
    intervalRef.current = setInterval(moveSnake, 200);
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={styles.container}>

          <Text style={styles.title}>Jogo da Minhoca</Text>
          <View style={styles.board}>
            {Array.from({ length: BOARD_SIZE }).map((_, row) => (
              <View key={row} style={styles.boardRow}>
                {Array.from({ length: BOARD_SIZE }).map((_, col) => (
                  <View
                    key={col}
                    style={[
                      styles.cell,
                      snake.some((segment) => segment.x === col && segment.y === row) && styles.snake,
                      food.x === col && food.y === row && styles.food,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDirection({ x: 0, y: -1 })}
              >
              <Text style={styles.resetButtonText}>Up</Text>
            </TouchableOpacity>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setDirection({ x: -1, y: 0 })}
              >
                <Text style={styles.resetButtonText}>Left</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setDirection({ x: 1, y: 0 })}
              >
                <Text style={styles.resetButtonText}>Right</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDirection({ x: 0, y: 1 })}
              >
              <Text style={styles.resetButtonText}>Down</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </PanGestureHandler>
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
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'column',
  },
  boardRow: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  snake: {
    backgroundColor: 'green',
  },
  food: {
    backgroundColor: 'red',
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
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin: 5,
  },
  controls: {
    minHeight: 50,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlRow: {
    padding: 5,
    flexDirection: 'row',
  },
});
