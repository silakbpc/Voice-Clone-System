import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />

      <Text style={styles.title}>Auralis</Text>

      <Text style={styles.subtitle}>
        Clone Any Voice{"\n"}
        Create Limitless Possibilities
      </Text>

      <ActivityIndicator
        size="large"
        color="#1877F2"
        style={{ marginTop: 60 }}
      />

      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },

  title: {
    fontSize: 58,
    fontWeight: "bold",
    color: "#001B44",
    marginBottom: 20,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#7A7A7A",
    lineHeight: 38,
  },

  loading: {
    marginTop: 20,
    fontSize: 18,
    color: "#7A7A7A",
  },
});
