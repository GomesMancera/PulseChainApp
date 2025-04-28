import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const pulse = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulse.value }],
      opacity: 2 - pulse.value,
    };
  });

  React.useEffect(() => {
    pulse.value = withRepeat(
      withTiming(2, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/world-map.png')} style={styles.mapImage} resizeMode="contain" />
      
      <Animated.View style={[styles.pulseCircle, { top: 200, left: 100 }, animatedStyle]} />
      <Animated.View style={[styles.pulseCircle, { top: 250, left: 250 }, animatedStyle]} />
      <Animated.View style={[styles.pulseCircle, { top: 350, left: 180 }, animatedStyle]} />
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
  mapImage: {
    width: width - 20,
    height: 400,
  },
  pulseCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#00FFFF',
  },
});
