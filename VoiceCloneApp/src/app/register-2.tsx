import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function RegisterTwoScreen() {
  const { fullName, birthDate, emailOrPhone } = useLocalSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const cleanUsername = username.trim().toLowerCase();
  const email = String(emailOrPhone).trim().toLowerCase();

  const usernameInvalid = username.length > 0 && !/^[a-z0-9_]+$/.test(username);

  const passwordInvalid =
    password.length > 0 && !/^(?=.*[A-Z]).{6,}$/.test(password);

  const confirmInvalid =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = async () => {
    setUsernameTaken(false);
    setEmailTaken(false);

    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (usernameInvalid || passwordInvalid || confirmInvalid) return;

    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", cleanUsername)
    );

    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      setUsernameTaken(true);
      return;
    }

    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      setEmailTaken(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: String(fullName),
        birthDate: String(birthDate),
        email,
        username: cleanUsername,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created");
      router.replace("/home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailTaken(true);
        return;
      }

      Alert.alert("Register Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.logo}>Auralis</Text>

      {emailTaken && (
        <Text style={styles.topError}>This email is already registered.</Text>
      )}

      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        style={[
          styles.input,
          (usernameInvalid || usernameTaken) && styles.inputError,
        ]}
        value={username}
        onChangeText={(text) => {
          setUsername(text.toLowerCase());
          setUsernameTaken(false);
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {usernameInvalid && (
        <Text style={styles.errorText}>
          Username can only contain lowercase letters, numbers and _.
        </Text>
      )}

      {usernameTaken && (
        <Text style={styles.errorText}>This username is already taken.</Text>
      )}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={[styles.input, passwordInvalid && styles.inputError]}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
      />

      {passwordInvalid && (
        <Text style={styles.errorText}>
          Password must be at least 6 characters and contain 1 uppercase letter.
        </Text>
      )}

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={[styles.input, confirmInvalid && styles.inputError]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
      />

      {confirmInvalid && (
        <Text style={styles.errorText}>Passwords do not match.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 25,
    zIndex: 10,
  },
  backText: {
    color: "#4A90E2",
    fontSize: 42,
  },
  logo: {
    color: "#4A90E2",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "red",
    marginBottom: 6,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 14,
  },
  topError: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
