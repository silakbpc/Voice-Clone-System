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
import * as DocumentPicker from "expo-document-picker";

export default function FilePreviewScreen() {
  const { fileName, uri } = useLocalSearchParams<{
    fileName: string;
    uri: string;
  }>();

  const player = useAudioPlayer(require("../../../assets/Sıla.m4a"));

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    try {
      if (!isPlaying) {
        player.seekTo?.(0);
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("PLAY ERROR:", error);
    }
  };

  const pickNewFile = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.fileIcon}>
        <Ionicons name="musical-notes" size={70} color="#A855F7" />
      </View>

      <Text style={styles.fileName}>{fileName}</Text>

      <Text style={styles.fileInfo}>Referans ses dosyası</Text>

      <View style={styles.audioBox}>
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.waveContainer}>
          {[
            35, 55, 75, 95, 80, 60, 45, 30, 50, 70, 90, 100, 85, 65, 40, 30, 45,
            70, 90, 80, 60, 45, 35, 55, 75, 95, 80, 60, 45, 30, 40, 65, 85, 95,
            75, 55, 35,
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
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/file/preparing")}
      >
        <Text style={styles.primaryText}>Devam Et</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={pickNewFile}>
        <Text style={styles.secondaryText}>Başka Dosya Seç</Text>
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

  fileIcon: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: "#1D1230",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
  },

  fileName: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  fileInfo: {
    color: "#A1A1AA",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  audioBox: {
    backgroundColor: "#12101A",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
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
    gap: 3,
  },

  bar: {
    width: 4,
    borderRadius: 4,
    backgroundColor: "#A855F7",
  },

  infoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  infoLabel: {
    color: "#888",
    fontSize: 14,
  },

  infoValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
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
