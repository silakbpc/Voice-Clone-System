import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function CompletedScreen() {
  const { uri, duration } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#A855F7" />
      </TouchableOpacity>

      <View style={styles.completedCircle}>
        <Ionicons name="checkmark" size={80} color="#A855F7" />
      </View>

      <Text style={styles.title}>Kayıt Tamamlandı</Text>

      <Text style={styles.subtitle}>Ses kaydınız başarıyla oluşturuldu.</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          router.push({
            pathname: "/record/preview",
            params: {
              uri,
              duration,
            },
          })
        }
      >
        <Text style={styles.primaryText}>Dinle</Text>
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
    alignItems: "center",
    padding: 24,
  },

  completedCircle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#161122",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },

  subtitle: {
    color: "#AAA",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: "#7C3AED",
    width: "100%",
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
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  secondaryText: {
    color: "white",
    fontSize: 18,
  },

  backButton: {
    position: "absolute",
    top: 70,
    left: 30,
    zIndex: 10,
  },
});
