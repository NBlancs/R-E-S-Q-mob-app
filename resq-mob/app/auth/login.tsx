// app/auth/login.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { loginStyles as styles } from "../../styles/auth/login";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    const success = login(email, password);
    setLoading(false);

    if (!success) {
      Alert.alert("Invalid Credentials", "Please check your email and password.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logo}>R.E.S.Q</Text>
        <Text style={styles.logoSubtitle}>Rapid Emergency Surveillance & Quenching</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.welcomeSubtitle}>Enter your details to sign in</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            style={styles.input}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            editable={!loading}
            style={styles.input}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.signInButton, loading && styles.signInButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.signInButtonText}>{loading ? "Signing In..." : "Sign In"}</Text>
        </TouchableOpacity>
      </View>

      {/* Demo Credentials */}
      <View style={styles.demoSection}>
        <Text style={styles.demoTitle}>Demo Credentials</Text>
        <Text style={styles.demoText}>Admin: admin@gmail.com / admin123</Text>
        <Text style={styles.demoText}>BFP: bfp@gmail.com / bfp123</Text>
      </View>
    </ScrollView>
  );
}