import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';
import { fetchBitcoinMarketData } from '../services/cryptoService';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function HeartbeatGraph() {
  const [volume, setVolume] = useState(1);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const amplitude = 10 + (volume / 50000000); // O volume vai influenciar a amplitude
    const path = `
      M0,50 
      Q25,${50 - amplitude} 50,50 
      T100,50 
      T150,50 
      T200,50
    `;
    return { d: path };
  });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );

    async function loadData() {
      const data = await fetchBitcoinMarketData();
      if (data && data.total_volumes && data.total_volumes.length > 0) {
        const lastVolume = data.total_volumes[data.total_volumes.length - 1][1];
        setVolume(lastVolume);
      }
    }

    loadData();
  }, []);

  return (
    <View style={{ marginTop: 40 }}>
      <Svg height="100" width="300">
        <AnimatedPath animatedProps={animatedProps} fill="none" stroke="#00FFFF" strokeWidth="2" />
      </Svg>
    </View>
  );
}
