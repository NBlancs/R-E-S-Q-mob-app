// app/auth/login.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { loginStyles as styles } from "../../styles/auth/login";

const RESQ_LOGO = require("../../assets/images/resq-logo.png");
const DOTS = Array.from({ length: 180 }, (_, index) => index);
const DROPLETS = [
  { x: -40, y: -56 },
  { x: 40, y: -56 },
  { x: -70, y: -38 },
  { x: 70, y: -38 },
  { x: 0, y: -76 },
  { x: -22, y: -48 },
  { x: 22, y: -48 },
];

export default function Login() {
  const { login } = useAuth();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(1)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;
  const loginTranslate = useRef(new Animated.Value(18)).current;
  const flip = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const ripple = useRef(new Animated.Value(0)).current;
  const droplet = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flipLoop = Animated.loop(
      Animated.timing(flip, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const bounceLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 1000,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    flipLoop.start();
    bounceLoop.start();

    const runSplashEffect = () => {
      ripple.setValue(0);
      droplet.setValue(0);
      Animated.parallel([
        Animated.timing(ripple, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(droplet, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    };

    let splashInterval: ReturnType<typeof setInterval> | undefined;

    const splashTimer = setTimeout(() => {
      setShowLogin(true);
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(splashScale, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(loginOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(loginTranslate, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 2500);

    const splashSyncTimer = setTimeout(() => {
      runSplashEffect();
      splashInterval = setInterval(runSplashEffect, 2000);
    }, 3500);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(splashSyncTimer);
      if (splashInterval) {
        clearInterval(splashInterval);
      }
      flipLoop.stop();
      bounceLoop.stop();
    };
  }, [bounce, droplet, flip, loginOpacity, loginTranslate, ripple, splashOpacity, splashScale]);

  const handleLogin = async () => {
    if (!identity || !password) {
      Alert.alert("Validation Error", "Please enter your personnel ID or email and password.");
      return;
    }

    setLoading(true);
    const result = await login(identity, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert("Login Failed", result.message);
    }
  };

  const flipRotation = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const bounceTranslate = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 10],
  });

  return (
    <View style={styles.root}>
      <Animated.View
        pointerEvents={showLogin ? "none" : "auto"}
        style={[
          styles.splashScreen,
          {
            opacity: splashOpacity,
            transform: [{ scale: splashScale }],
          },
        ]}
      >
        <DotGrid />
        <Animated.View
          style={[
            styles.splashLogoWrap,
            { transform: [{ perspective: 1000 }, { rotateY: flipRotation }] },
          ]}
        >
          <Image contentFit="contain" source={RESQ_LOGO} style={styles.splashLogo} />
        </Animated.View>
        <Text style={styles.splashKicker}>EMERGENCY DISPATCH SYSTEM</Text>
        <Text style={styles.versionText}>v2.4.0</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.loginScreen,
          {
            opacity: loginOpacity,
            transform: [{ translateY: loginTranslate }],
          },
        ]}
      >
        <MeshBackground />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                  <Animated.View
                    style={[styles.bouncingLogo, { transform: [{ translateY: bounceTranslate }] }]}
                  >
                    <Image contentFit="contain" source={RESQ_LOGO} style={styles.logoImage} />
                  </Animated.View>
                  <SplashEffect droplet={droplet} ripple={ripple} />
                </View>

                <View style={styles.titleBlock}>
                  <View style={styles.titleMark} />
                  <Text style={styles.title}>System Access</Text>
                  <Text style={styles.subtitle}>Secured personnel authentication portal</Text>
                </View>
              </View>

              <View style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Personnel ID</Text>
                  <View style={styles.inputShell}>
                    <MaterialIcons name="account-circle" size={22} color="#8f6f70" />
                    <TextInput
                      autoCapitalize="none"
                      editable={!loading}
                      keyboardType="email-address"
                      onChangeText={setIdentity}
                      placeholder="e.g. admin@gmail.com"
                      placeholderTextColor="rgba(91, 64, 64, 0.42)"
                      style={styles.input}
                      value={identity}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.passwordLabelRow}>
                    <Text style={styles.label}>Password</Text>
                    <Pressable hitSlop={10}>
                      <Text style={styles.recoveryText}>Recovery?</Text>
                    </Pressable>
                  </View>
                  <View style={styles.inputShell}>
                    <MaterialIcons name="lock" size={22} color="#8f6f70" />
                    <TextInput
                      editable={!loading}
                      onChangeText={setPassword}
                      placeholder="Password"
                      placeholderTextColor="rgba(91, 64, 64, 0.42)"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      value={password}
                    />
                    <Pressable
                      accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                      hitSlop={10}
                      onPress={() => setShowPassword((current) => !current)}
                      style={styles.eyeButton}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility-off" : "visibility"}
                        size={22}
                        color="#8f6f70"
                      />
                    </Pressable>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.82}
                  disabled={loading}
                  onPress={handleLogin}
                  style={[styles.authorizeButton, loading && styles.authorizeButtonDisabled]}
                >
                  <MaterialIcons name="login" size={20} color="#ffffff" />
                  <Text style={styles.authorizeButtonText}>
                    {loading ? "Authorizing..." : "Authorize Access"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.notice}>
                  <MaterialIcons name="info-outline" size={20} color="#236580" />
                  <Text style={styles.noticeText}>
                    BFP personnel and Command Staff will be automatically routed to their designated
                    mission dashboards.
                  </Text>
                </View>
              </View>

              <View style={styles.securityRow}>
                <View style={styles.securityBadge}>
                  <MaterialIcons name="local-fire-department" size={22} color="#5b4040" />
                </View>
                <View style={styles.securityDivider} />
                <View style={styles.securityBadge}>
                  <MaterialIcons name="shield" size={22} color="#5b4040" />
                </View>
              </View>

              <View style={styles.footer}>
                <MaterialIcons name="verified-user" size={16} color="#5b4040" />
                <Text style={styles.footerText}>R-E-S-Q Command Center - v2.4.0</Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

function DotGrid() {
  return (
    <View style={styles.dotGrid} pointerEvents="none">
      {DOTS.map((dot) => (
        <View key={dot} style={styles.dot} />
      ))}
    </View>
  );
}

function MeshBackground() {
  return (
    <View style={styles.meshBackground} pointerEvents="none">
      <View style={[styles.meshGlow, styles.meshGlowPrimaryTop]} />
      <View style={[styles.meshGlow, styles.meshGlowSecondaryTop]} />
      <View style={[styles.meshGlow, styles.meshGlowPrimaryBottom]} />
      <View style={[styles.meshGlow, styles.meshGlowSecondaryBottom]} />
    </View>
  );
}

function SplashEffect({
  droplet,
  ripple,
}: {
  droplet: Animated.Value;
  ripple: Animated.Value;
}) {
  return (
    <View style={styles.splashLayer} pointerEvents="none">
      <Animated.View
        style={[
          styles.ripple,
          {
            opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }),
            transform: [
              { scaleX: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.08, 1] }) },
              { scaleY: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.12, 1] }) },
            ],
          },
        ]}
      />
      {DROPLETS.map((drop, index) => (
        <Animated.View
          key={`${drop.x}-${drop.y}-${index}`}
          style={[
            styles.droplet,
            {
              opacity: droplet.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
              transform: [
                { translateX: droplet.interpolate({ inputRange: [0, 1], outputRange: [0, drop.x] }) },
                { translateY: droplet.interpolate({ inputRange: [0, 1], outputRange: [0, drop.y] }) },
                { scale: droplet.interpolate({ inputRange: [0, 1], outputRange: [1, 0.2] }) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}
