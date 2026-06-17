import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PreparingScreen() {
  const { uri, duration } = useLocalSearchParams<{
    uri: string;
    duration: string;
  }>();

  useEffect(() => {
    uploadAudio();
  }, []);

  const uploadAudio = async () => {
    try {
      console.log("SES YÜKLEME BAŞLADI");

      const formData = new FormData();

      formData.append("file", {
        uri: String(uri),
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);

      const response = await fetch(`${API_URL}/upload-audio`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("UPLOAD RESPONSE:", data);

      router.replace({
        pathname: "/generate/text",
        params: {
          uri,
          duration,
        },
      });
    } catch (error) {
      console.log("UPLOAD ERROR:", error);

      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingCircle}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>

      <Text style={styles.title}>Ses Hazırlanıyor</Text>

      <Text style={styles.subtitle}>
        Ses dosyanız analiz ediliyor.{"\n"}
        Klonlama için temizleniyor.
      </Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.infoText}>Bu işlem birkaç saniye sürebilir</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05010A",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  loadingCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#A1A1AA",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 15,
    marginBottom: 35,
  },

  progressBackground: {
    width: "100%",
    height: 10,
    borderRadius: 20,
    backgroundColor: "#1E1A2D",
    overflow: "hidden",
  },

  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: "#A855F7",
    borderRadius: 20,
  },

  infoText: {
    color: "#777",
    marginTop: 20,
    fontSize: 14,
  },
});
