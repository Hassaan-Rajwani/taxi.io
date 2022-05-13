import { StyleSheet, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './src/store/Store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MainNavigator from './src/config/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
