import { SafeAreaView, View, Text, StyleSheet, Animated } from "react-native";

import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GenerateLoadingScreen() {
  const { text } = useLocalSearchParams<{
    text: string;
  }>();

  const progress = useRef(new Animated.Value(0)).current;

  const [stepText, setStepText] = useState("Metin işleniyor...");

  const [remainingTime, setRemainingTime] = useState(8);

  useEffect(() => {
    startAnimation();
    generateVoice();
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setTimeout(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  const startAnimation = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 8000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setStepText("Ses sentezleniyor...");
      setRemainingTime(5);
    }, 2500);

    setTimeout(() => {
      setStepText("Son dokunuşlar yapılıyor...");
      setRemainingTime(2);
    }, 5500);
  };

  const generateVoice = async () => {
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();

      router.replace({
        pathname: "/generate/result",
        params: {
          audioUrl: data.audio_url,
        },
      });
    } catch (error) {
      console.log("GENERATE ERROR:", error);

      router.back();
    }
  };

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="pulse" size={64} color="#A855F7" />
      </View>

      <Text style={styles.title}>Sesiniz Oluşturuluyor</Text>

      <Text style={styles.subtitle}>{stepText}</Text>

      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: widthInterpolate,
            },
          ]}
        />
      </View>

      <Text style={styles.timeText}>
        Tahmini kalan süre: {remainingTime}
        sn
      </Text>
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
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },

  aiIcon: {
    fontSize: 52,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    color: "#A1A1AA",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 40,
  },

  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#1E1A2D",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#A855F7",
    borderRadius: 20,
  },

  timeText: {
    color: "#C4B5FD",
    marginTop: 20,
    fontSize: 15,
  },
});
