import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { auth, db } from "../firebaseConfig";

import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.log("PROFILE ERROR:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();

      router.replace("/login");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="#A855F7" />
      </TouchableOpacity>

      <View style={styles.avatar}>
        <Ionicons name="person" size={60} color="white" />
      </View>

      <Text style={styles.name}>{userData?.fullName || "Kullanıcı"}</Text>

      <Text style={styles.email}>{userData?.email}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Kullanıcı Adı</Text>

        <Text style={styles.value}>@{userData?.username}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Doğum Tarihi</Text>

        <Text style={styles.value}>{userData?.birthDate}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>E-Posta</Text>

        <Text style={styles.value}>{userData?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="white" />

        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05010A",
    paddingHorizontal: 24,
  },

  backButton: {
    marginTop: 25,
    width: 60,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
  },

  email: {
    color: "#A1A1AA",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#12101A",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#26233A",
  },

  label: {
    color: "#8B8B95",
    fontSize: 14,
    marginBottom: 10,
  },

  value: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  logoutButton: {
    marginTop: 12,
    backgroundColor: "#EF4444",
    height: 62,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
