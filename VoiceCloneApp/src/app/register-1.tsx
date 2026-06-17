import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function RegisterOneScreen() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const cleanEmail = emailOrPhone.trim().toLowerCase();

  const emailInvalid =
    emailOrPhone.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const handleContinue = async () => {
    setEmailTaken(false);

    if (!fullName || !birthDate || !emailOrPhone) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (emailInvalid) return;

    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", cleanEmail)
    );

    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      setEmailTaken(true);
      return;
    }

    router.push({
      pathname: "/register-2",
      params: {
        fullName: fullName.trim(),
        birthDate,
        emailOrPhone: cleanEmail,
      },
    });
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS !== "ios") setShowPicker(false);

    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();

      setBirthDate(`${day}/${month}/${year}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.logo}>Auralis</Text>
      <Text style={styles.title}>Personal Info</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#888"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          placeholder="Birth Date"
          placeholderTextColor="#888"
          style={styles.input}
          value={birthDate}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <View style={styles.datePickerBox}>
          <DateTimePicker
            value={new Date(2000, 0, 1)}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            themeVariant="dark"
            textColor="white"
            onChange={handleDateChange}
          />

          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={[
          styles.input,
          (emailInvalid || emailTaken) && styles.inputError,
        ]}
        value={emailOrPhone}
        onChangeText={(text) => {
          setEmailOrPhone(text);
          setEmailTaken(false);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      {emailInvalid && (
        <Text style={styles.errorText}>
          Please enter a valid email address.
        </Text>
      )}

      {emailTaken && (
        <Text style={styles.errorText}>This email is already registered.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  datePickerBox: {
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    marginBottom: 20,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    margin: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
