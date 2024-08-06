/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Tetris from '../Jogos/Tetris';
import JogoDaVelhaScreen from '../Jogos/JogoVelha';
import SnakeGameScreen from '../Jogos/SnakeGame';
import Home from '../Home/TelaHome';

const Stack = createStackNavigator();
function Homes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}
function TetrisStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Jogo-Do-Tetris"
        component={Tetris}
        options={{ title: 'Tetris' }}
      />
    </Stack.Navigator>
  );
}
function JogoDaVelhaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Jogo-Da-Velha"
        component={JogoDaVelhaScreen}
        options={{ title: 'Jogo da Velha' }}
      />
    </Stack.Navigator>
  );
}

function SnakeGameStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Snake-Game"
        component={SnakeGameScreen}
        options={{ title: 'Snake Game' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="JogoDaVelha"
            component={JogoDaVelhaStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tetris"
            component={TetrisStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Homes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SnakeGame"
            component={SnakeGameStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
