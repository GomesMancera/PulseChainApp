import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { getGlobalMarketData, getRegionalVolumes } from '../services/cryptoService';

const { width } = Dimensions.get('window');

// 📍 Posições refinadas
const regionPositions = [
  { top: '35%', left: '30%' }, // EUA (ajustado para esquerda)
  { top: '58%', left: '30%' }, // Brasil
  { top: '32%', left: '45%' }, // Europa
  { top: '52%', left: '42%' }, // África (ajustado levemente)
  { top: '48%', left: '63%' }, // Índia
  { top: '38%', left: '68%' }, // China
  { top: '35%', left: '75%' }, // Japão
  { top: '65%', left: '72%' }, // Austrália
];

export default function MapScreen() {
  const [marketCap, setMarketCap] = useState(null);
  const [pulseScales, setPulseScales] = useState([]);
  const sharedValuesRef = useRef(regionPositions.map(() => useSharedValue(1)));

  useEffect(() => {
    const fetchData = async () => {
      const globalData = await getGlobalMarketData();
      const regionalData = await getRegionalVolumes();

      if (globalData) setMarketCap(globalData.total_market_cap.usd);

      if (regionalData && regionalData.length > 0) {
        const maxCap = Math.max(...regionalData.map(m => m.market_cap));
        const normalizedScales = regionalData.map(m => {
          const percent = m.market_cap / maxCap;
          const scale = 1 + percent * 1.2; // mais suave e equilibrado
          return Math.min(scale, 2.0); // limite máximo ajustado
        });

        setPulseScales(normalizedScales);

        normalizedScales.forEach((scale, i) => {
          sharedValuesRef.current[i].value = withRepeat(
            withTiming(scale, { duration: 1200, easing: Easing.ease }),
            -1,
            true
          );
        });
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <Image
          source={require('../../assets/world-map.png')}
          style={styles.mapImage}
          resizeMode="contain"
        />

        {regionPositions.map(({ top, left }, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: sharedValuesRef.current[index].value }],
            opacity: 2 - sharedValuesRef.current[index].value,
          }));

          return (
            <Animated.View
              key={index}
              style={[styles.pulseCircle, { top, left }, animatedStyle]}
            />
          );
        })}
      </View>

      {marketCap && (
        <Text style={{ color: 'white', marginTop: 20, fontSize: 14 }}>
          Market Cap Global: ${marketCap.toLocaleString()}
        </Text>
      )}
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
  mapWrapper: {
    width: width * 0.95,
    aspectRatio: 2,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pulseCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00FFFF',
  },
});
