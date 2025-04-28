import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa Pulsante 🌍</Text>
      <Text style={styles.subtitle}>Movimentação cripto pelo mundo</Text>
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
    fontSize: 28,
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 10,
  },
});
