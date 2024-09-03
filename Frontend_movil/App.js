import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import icon from './assets/icon.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{height: 920, width: 475}}/>
      <Text>Open up App.js to start working on your app.</Text>
      <StatusBar style="dark" />
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
