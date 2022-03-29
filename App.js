import { StyleSheet, View } from 'react-native';
// import Login from './view/logIn/login';
import Dashbaord from './view/dashboard/dashbaord';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <Dashbaord />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
