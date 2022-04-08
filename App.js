import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/config/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
