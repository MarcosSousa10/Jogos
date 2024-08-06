/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Text, View, Button, StyleSheet,
} from 'react-native';

export default function GamePage({ navigation }) {
  const handleOption1Press = () => {
    navigation.navigate('JogoDaVelha');
  };

  const handleOption2Press = () => {
    navigation.navigate('SnakeGame');
  };
  const handleOption3Press = () => {
    navigation.navigate('Tetris');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma opção:</Text>
      <View style={styles.buttonContainer}>
        <Button title="Jogo-Do-Tetris" onPress={handleOption3Press} />
        <Button title="Jogo-Da-Velha" onPress={handleOption1Press} />
        <Button title="Snake-Game" onPress={handleOption2Press} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
