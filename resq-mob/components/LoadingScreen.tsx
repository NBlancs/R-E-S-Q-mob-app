import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const RESQ_LOGO = require("../assets/images/resq-logo.png");
const DOTS = Array.from({ length: 180 }, (_, index) => index);

export default function LoadingScreen() {
  const flip = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flipLoop = Animated.loop(
      Animated.timing(flip, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    flipLoop.start();
    pulseLoop.start();

    return () => {
      flipLoop.stop();
      pulseLoop.stop();
    };
  }, [flip, pulse]);

  const rotateY = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const subtitleOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 0.9],
  });

  return (
    <View style={styles.container}>
      <View style={styles.dotGrid} pointerEvents="none">
        {DOTS.map((dot) => (
          <View key={dot} style={styles.dot} />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.logoWrap, { transform: [{ perspective: 1000 }, { rotateY }] }]}>
          <Image contentFit="contain" source={RESQ_LOGO} style={styles.logo} />
        </Animated.View>

        <Animated.Text style={[styles.kicker, { opacity: subtitleOpacity }]}>
          EMERGENCY DISPATCH SYSTEM
        </Animated.Text>
      </View>

      <Text style={styles.version}>v2.4.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#f4faff",
  },
  dotGrid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.9,
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 11,
    marginVertical: 11,
    borderRadius: 1,
    backgroundColor: "#dce3e9",
  },
  content: {
    width: "100%",
    alignItems: "center",
    gap: 24,
  },
  logoWrap: {
    width: "72%",
    maxWidth: 420,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  kicker: {
    color: "#5b4040",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.4,
    textAlign: "center",
  },
  version: {
    position: "absolute",
    bottom: 34,
    color: "#8f6f70",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.45,
  },
});
