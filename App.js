import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Importa o seu componente de navegação

export default function App() {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
