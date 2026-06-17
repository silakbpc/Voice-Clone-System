import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { router, useLocalSearchParams } from "expo-router";

import { useAudioPlayer } from "expo-audio";

export default function PreviewScreen() {
  const { uri, duration } = useLocalSearchParams<{
    uri: string;
    duration: string;
  }>();

  const player = useAudioPlayer(uri);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    try {
      if (!uri) return;

      if (!isPlaying) {
        player.seekTo?.(0);
        player.play();
        setIsPlaying(true);

        setTimeout(() => {
          setIsPlaying(false);
        }, Number(duration) * 1000);
      } else {
        player.pause?.();
        setIsPlaying(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadAndContinue = async () => {
    try {
      if (!uri) {
        console.log("URI bulunamadı");
        return;
      }

      const API_URL = process.env.EXPO_PUBLIC_API_URL;

      if (!API_URL) {
        console.log("API_URL bulunamadı. .env dosyasını kontrol et.");
        return;
      }

      console.log("SES YÜKLEME BAŞLADI");
      console.log("URI:", uri);
      console.log("API_URL:", API_URL);

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);

      const response = await fetch(`${API_URL}/upload-audio`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("UPLOAD RESPONSE:", data);

      if (!response.ok) {
        console.log("Upload başarısız:", data);
        return;
      }

      router.push({
        pathname: "/record/preparing",
        params: {
          uri,
          duration,
        },
      });
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
    }
  };

  const formatDuration = () => {
    const total = Number(duration || 0);

    const minutes = Math.floor(total / 60);

    const seconds = total % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Kaydınızı dinleyin</Text>

      <View style={styles.audioBox}>
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Ionicons
            name={isPlaying ? "stop" : "play"}
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.waveContainer}>
          {[
            18, 28, 42, 55, 38, 26, 44, 62, 48, 34, 22, 18, 28, 40, 58, 46, 30,
            24, 38, 52, 44, 30,
          ].map((h, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: h,
                },
              ]}
            />
          ))}
        </View>

        <Text style={styles.time}>{formatDuration()}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleUploadAndContinue}
      >
        <Text style={styles.primaryText}>Gönder</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/record/listening")}
      >
        <Text style={styles.secondaryText}>Tekrar Kaydet</Text>
      </TouchableOpacity>
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

  closeButton: {
    position: "absolute",
    top: 70,
    left: 30,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 50,
  },

  audioBox: {
    backgroundColor: "#12101A",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },

  playButton: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  waveContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  bar: {
    width: 5,
    borderRadius: 5,
    backgroundColor: "#A855F7",
  },

  time: {
    color: "#AAA",
    marginLeft: 10,
    fontSize: 18,
  },

  primaryButton: {
    backgroundColor: "#7C3AED",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 18,
  },

  primaryText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#7C3AED",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  secondaryText: {
    color: "white",
    fontSize: 18,
  },
});
