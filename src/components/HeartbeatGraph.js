import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function HeartbeatGraph() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const amplitude = 20 * Math.sin(progress.value * Math.PI * 2);
    const path = `
      M0,50 
      Q25,${50 - amplitude} 50,50 
      T100,50 
      T150,50 
      T200,50
    `;
    return { d: path };
  });

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  return (
    <View style={{ marginTop: 40 }}>
      <Svg height="100" width="300">
        <AnimatedPath animatedProps={animatedProps} fill="none" stroke="#00FFFF" strokeWidth="2" />
      </Svg>
    </View>
  );
}
