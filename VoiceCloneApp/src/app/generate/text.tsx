import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { Alert } from "react-native";

export default function GenerateTextScreen() {
  const [text, setText] = useState("");

  const handleGenerate = () => {
    router.push({
      pathname: "/generate/loading",
      params: {
        text,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#A855F7" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={50} color="#A855F7" />
        </View>

        <Text style={styles.title}>Metni Girin</Text>

        <Text style={styles.subtitle}>
          Klonlanan sesin okuyacağı metni yazın.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Örnek: Merhaba, ben İbrahim. Bu ses yapay zeka tarafından oluşturulmuştur."
          placeholderTextColor="#666"
          style={styles.input}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={22} color="#A855F7" />

        <Text style={styles.infoText}>
          Daha doğal sonuçlar için noktalama işaretleri kullanın.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.generateButton, !text.trim() && { opacity: 0.5 }]}
        disabled={!text.trim()}
        onPress={handleGenerate}
      >
        <Ionicons name="flash" size={22} color="white" />

        <Text style={styles.generateText}>Generate Voice</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05010A",
    padding: 24,
  },

  backButton: {
    marginTop: 60,
    marginBottom: 25,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#A1A1AA",
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
  },

  inputContainer: {
    flex: 1,
  },

  input: {
    backgroundColor: "#12101A",
    borderRadius: 24,
    padding: 20,
    color: "white",
    fontSize: 17,
    minHeight: 260,
    borderWidth: 1,
    borderColor: "#2A233B",
  },

  infoCard: {
    backgroundColor: "#12101A",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    marginBottom: 20,
  },

  infoText: {
    color: "#C4B5FD",
    flex: 1,
    fontSize: 14,
  },

  generateButton: {
    backgroundColor: "#7C3AED",
    height: 62,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },

  generateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
