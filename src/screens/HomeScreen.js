import { View, Text, StyleSheet } from 'react-native';
import HeartbeatGraph from '../components/HeartbeatGraph';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PulseChain 🔥</Text>
      <Text style={styles.subtitle}>Sinta o batimento do mercado cripto</Text>
      <HeartbeatGraph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 10,
  },
});
