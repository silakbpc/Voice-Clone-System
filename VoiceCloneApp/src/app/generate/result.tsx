import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from "react-native";

import { auth, db } from "../../firebaseConfig";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";

import { router, useLocalSearchParams } from "expo-router";

import { useAudioPlayer } from "expo-audio";

export default function GenerateResultScreen() {
  const { audioUrl } = useLocalSearchParams<{
    audioUrl: string;
  }>();

  const player = useAudioPlayer(audioUrl);

  console.log("AUDIO URL Result:", audioUrl);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (
          isPlaying &&
          player.duration > 0 &&
          player.currentTime >= player.duration
        ) {
          setIsPlaying(false);
        }
      } catch (error) {}
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (!audioUrl) return;

    if (!isPlaying) {
      player.seekTo?.(0);
      player.play();
      setIsPlaying(true);
    } else {
      player.pause?.();
      setIsPlaying(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => {
          player.pause?.();
          setIsPlaying(false);
          router.replace("/home");
        }}
      >
        <Ionicons name="home-outline" size={30} color="#A855F7" />
      </TouchableOpacity>

      <View style={styles.successCircle}>
        <Ionicons name="checkmark" size={55} color="#A855F7" />
      </View>

      <Text style={styles.title}>Ses Hazır</Text>

      <Text style={styles.subtitle}>
        Yapay zeka tarafından oluşturulan ses başarıyla hazırlandı.
      </Text>

      <View style={styles.audioCard}>
        <Ionicons name="musical-notes" size={36} color="#A855F7" />

        <Text style={styles.audioTitle}>Generated Voice</Text>

        <Text style={styles.audioDuration}></Text>

        <View style={styles.waveContainer}>
          {[20, 40, 65, 90, 70, 50, 35, 25, 40, 75, 95, 70, 55, 30].map(
            (h, i) => (
              <View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: h,
                  },
                ]}
              />
            )
          )}
        </View>

        <TouchableOpacity style={styles.listenButton} onPress={togglePlayback}>
          <Ionicons
            name={isPlaying ? "stop" : "play"}
            size={20}
            color="white"
          />

          <Text style={styles.listenText}>
            {isPlaying ? "Durdur" : "Dinle"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05010A",
    justifyContent: "center",
    padding: 24,
  },

  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
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
    marginTop: 12,
    marginBottom: 30,
    lineHeight: 24,
    fontSize: 15,
  },

  audioCard: {
    backgroundColor: "#12101A",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  audioTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  audioDuration: {
    color: "#A1A1AA",
    marginTop: 6,
    marginBottom: 16,
  },

  waveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: 18,
  },

  waveBar: {
    width: 5,
    borderRadius: 5,
    backgroundColor: "#A855F7",
  },

  listenButton: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  listenText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },

  actionCard: {
    height: 58,
    paddingHorizontal: 20,
    backgroundColor: "#12101A",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  actionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  homeButton: {
    position: "absolute",
    top: 70,
    left: 30,
    zIndex: 10,
  },
});
