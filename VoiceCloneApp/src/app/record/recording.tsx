import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from "react-native";

import { useEffect, useRef, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { AudioModule, useAudioRecorder, RecordingPresets } from "expo-audio";

export default function RecordingScreen() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const [recordTime, setRecordTime] = useState(0);

  const [isStopping, setIsStopping] = useState(false);

  const bars = useRef(
    Array.from({ length: 28 }, () => new Animated.Value(20))
  ).current;

  useEffect(() => {
    let mounted = true;

    const initializeRecording = async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();

        if (!status.granted) {
          return;
        }

        await AudioModule.setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });

        await recorder.prepareToRecordAsync();

        recorder.record();
      } catch (error) {
        console.log("Recorder Error:", error);
      }
    };

    initializeRecording();

    const timer = setInterval(() => {
      if (!mounted) return;

      setRecordTime((prev) => prev + 1);

      bars.forEach((bar) => {
        Animated.timing(bar, {
          toValue: Math.floor(Math.random() * 90) + 18,
          duration: 180,
          useNativeDriver: false,
        }).start();
      });
    }, 500);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const stopRecording = async () => {
    if (isStopping) return;

    try {
      setIsStopping(true);

      await recorder.stop();

      console.log("Kayıt:", recorder.uri);

      router.replace({
        pathname: "/record/completed",
        params: {
          uri: recorder.uri,
          duration: recordTime.toString(),
        },
      });
    } catch (error) {
      console.log("STOP ERROR:", error);
    } finally {
      setIsStopping(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);

    const s = seconds % 60;

    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Kaydediliyor...</Text>

      <Text style={styles.timer}>{formatTime(recordTime)}</Text>

      <View style={styles.waveform}>
        {bars.map((bar, index) => (
          <Animated.View
            key={index}
            style={[
              styles.waveBar,
              {
                height: bar,
                opacity: index % 2 === 0 ? 1 : 0.6,
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
        <Ionicons name="stop" size={38} color="white" />
      </TouchableOpacity>
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

  closeButton: {
    position: "absolute",
    top: 70,
    left: 30,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },

  timer: {
    color: "#D8B4FE",
    fontSize: 22,
    marginTop: 12,
    marginBottom: 60,
  },

  waveform: {
    height: 160,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 70,
  },

  waveBar: {
    width: 5,
    borderRadius: 10,
    backgroundColor: "#A855F7",
  },

  stopButton: {
    width: 110,
    height: 110,
    borderRadius: 80,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },
});
