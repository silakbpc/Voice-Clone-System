import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Login Error", "Wrong email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Auralis</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={[
          styles.input,
          emailError && { borderWidth: 1, borderColor: "red" },
        ]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {emailError && <Text style={styles.errorText}>Enter valid email.</Text>}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={[
          styles.input,
          passwordError && { borderWidth: 1, borderColor: "red" },
        ]}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        textContentType="oneTimeCode"
        autoCorrect={false}
      />

      {passwordError && (
        <Text style={styles.errorText}>
          Password must be at least 6 characters.
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register-1")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    color: "#4A90E2",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 40,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#1A1A1A",
    color: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4A90E2",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  link: {
    color: "#4A90E2",
    textAlign: "center",
    marginTop: 25,
    fontSize: 15,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
});
