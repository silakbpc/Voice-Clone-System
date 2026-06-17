import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  import { router } from "expo-router";
  
  export default function ListeningScreen() {
    return (
      <SafeAreaView style={styles.container}>
  
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="close"
            size={28}
            color="white"
          />
        </TouchableOpacity>
  
        <Text style={styles.title}>
          Dinliyorum...
        </Text>
  
        <TouchableOpacity
          style={styles.micButton}
          onPress={() =>
            router.push("/record/recording")
          }
        >
          <Ionicons
            name="mic"
            size={72}
            color="white"
          />
        </TouchableOpacity>
  
        <Text style={styles.subtitle}>
          Konuşmaya başlayabilirsin.
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
  
    closeButton: {
      position: "absolute",
      top: 70,
      left: 30,
    },
  
    title: {
      color: "white",
      fontSize: 34,
      fontWeight: "700",
      marginBottom: 70,
    },
  
    micButton: {
      width: 175,
      height: 175,
      borderRadius: 100,
      backgroundColor: "#7C3AED",
      justifyContent: "center",
      alignItems: "center",
    },
  
    subtitle: {
      color: "#A1A1AA",
      marginTop: 55,
      fontSize: 18,
    },
  });