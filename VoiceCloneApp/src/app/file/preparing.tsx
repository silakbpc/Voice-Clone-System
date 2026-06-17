import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useEffect } from "react";
import { router } from "expo-router";

import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PreparingScreen() {
  useEffect(() => {
    prepareAudio();
  }, []);

  const prepareAudio = async () => {
    try {
      console.log("SES YÜKLEME BAŞLADI");

      const asset = Asset.fromModule(require("../../../assets/Sıla.m4a"));

      await asset.downloadAsync();

      const fileUri = asset.localUri || asset.uri;

      const formData = new FormData();

      formData.append("file", {
        uri: fileUri,
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);

      const response = await fetch(`${API_URL}/upload-audio`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      console.log("UPLOAD RESPONSE:", result);

      router.replace("/generate/text");
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>

      <Text style={styles.title}>Ses Hazırlanıyor</Text>

      <Text style={styles.subtitle}>Referans ses işleniyor...</Text>
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

  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    color: "#A1A1AA",
    fontSize: 16,
    textAlign: "center",
  },
});
