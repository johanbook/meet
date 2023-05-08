import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Meet</Text>
      <StatusBar style="auto" />

      <BottomNavigation  />
    </View>
  );
}

