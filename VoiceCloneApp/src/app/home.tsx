import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pickAudio = () => {
    router.push({
      pathname: "/file/preview",
      params: {
        fileName: "Sıla.m4a",
        uri: "Sıla.m4a",
        duration: "12",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ÇIKIŞ BUTONU */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/login")}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Auralis</Text>

        <Text style={styles.subtitle}>AI Voice Cloning</Text>
      </View>

      {/* ICON */}
      <View style={styles.waveContainer}>
        <Ionicons name="pulse" size={90} color="#8B5CF6" />
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Nasıl yardımcı olabiliriz?</Text>

        <Text style={styles.description}>
          Ses kaydı yapabilir veya hazır referans ses dosyasını kullanabilirsin.
        </Text>
      </View>

      {/* KARTLAR */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => router.push("/record/listening")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="mic" size={24} color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Mikrofonu Aç</Text>

            <Text style={styles.cardSubtitle}>Ses kaydı başlat</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={pickAudio}>
          <View style={styles.iconBox}>
            <Ionicons name="document" size={22} color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Ses Dosyası Seç</Text>

            <Text style={styles.cardSubtitle}>Hazır ses dosyanı kullan</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>
      </View>

      {/* FLOATING MENU */}
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="person" size={20} color="#A855F7" />

            <Text style={styles.menuText}>Profilim</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MOR BUTON */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setMenuOpen(!menuOpen)}
      >
        <Ionicons name={menuOpen ? "close" : "add"} size={38} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05010A",
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  topBar: {
    position: "absolute",
    top: 70,
    right: 24,
    zIndex: 100,
  },

  logoutButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#12101A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A233B",
  },

  header: {
    alignItems: "center",
  },

  logo: {
    color: "white",
    fontSize: 42,
    fontWeight: "800",
  },

  subtitle: {
    color: "#A1A1AA",
    fontSize: 16,
    marginTop: 10,
  },

  waveContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  textContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 10,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  description: {
    color: "#A1A1AA",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },

  buttonContainer: {
    marginTop: 60,
    gap: 18,
  },

  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12101A",
    borderWidth: 1,
    borderColor: "#26233A",
    borderRadius: 24,
    padding: 20,
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  cardSubtitle: {
    color: "#A1A1AA",
    marginTop: 4,
    fontSize: 14,
  },

  dropdownMenu: {
    position: "absolute",

    bottom: 140,
    alignSelf: "center",

    width: 400,

    backgroundColor: "rgba(18,16,26,0.95)",

    borderRadius: 24,

    paddingVertical: 18,
    paddingHorizontal: 18,

    gap: 14,

    borderWidth: 1,
    borderColor: "#2A233B",

    zIndex: 99,
  },

  menuItem: {
    height: 68,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.03)",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 12,
  },

  menuText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  fabButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",

    width: 85,
    height: 85,
    borderRadius: 42.5,

    backgroundColor: "#7C3AED",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 100,
  },
});
