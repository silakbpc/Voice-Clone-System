import React from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { router } from "expo-router";

export default function OnboardingScreen() {
  return (
    <Onboarding
      onSkip={() => router.replace("/login")}
      onDone={() => router.replace("/login")}
      bottomBarHighlight={false}
      containerStyles={{
        paddingHorizontal: 20,
      }}
      pages={[
        {
          backgroundColor: "#0A0A0A",

          image: (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
              }}
              style={styles.image}
            />
          ),

          title: "Clone Any Voice",

          subtitle:
            "Create realistic AI voice clones with next-generation speech technology.",
        },

        {
          backgroundColor: "#0A0A0A",

          image: (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
              }}
              style={styles.image}
            />
          ),

          title: "Fast & Powerful",

          subtitle:
            "Generate high-quality cloned voices in seconds with advanced AI processing.",
        },

        {
          backgroundColor: "#0A0A0A",

          image: (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6463/6463383.png",
              }}
              style={styles.image2}
            />
          ),

          title: "Secure & Personal",

          subtitle:
            "Your voice and personal data stay encrypted, private and protected.",
        },
      ]}
      titleStyles={{
        color: "#4A90E2",
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 20,
      }}
      subTitleStyles={{
        color: "#E0E0E0",
        fontSize: 16,
        paddingHorizontal: 20,
        lineHeight: 24,
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  image2: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    tintColor: "#4A90E2",
    opacity: 0.9,
  },
});
