import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function PulsingMap() {
  return (
    <View style={styles.container}>
      <View style={styles.mapaWrapper}>
        {/* Pulsos posicionados relativos ao mapa */}
        <Animated.View style={[styles.pulso, { top: '20%', left: '60%' }]} />
        <Animated.View style={[styles.pulso, { top: '30%', left: '30%' }]} />
        <Animated.View style={[styles.pulso, { top: '50%', left: '70%' }]} />

        {/* Mapa */}
        <Image
          source={require('../../assets/world-map.png')}
          style={styles.mapa}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapaWrapper: {
    width: width * 0.9,
    aspectRatio: 1.5,
    position: 'relative',
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  pulso: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#00ffff',
    borderRadius: 10,
    opacity: 0.7,
  },
});
