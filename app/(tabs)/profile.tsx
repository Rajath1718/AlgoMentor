import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getUserProfile,
  initDatabase,
  updateUserProfile,
} from "../../services/database";

export default function ProfileScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    await initDatabase();

    let currentUser = "";

    if (Platform.OS === "web") {
      currentUser = localStorage.getItem("currentUser") || "";
    } else {
      currentUser = (await AsyncStorage.getItem("currentUser")) || "";
    }

    if (!currentUser) return;

    const user: any = await getUserProfile(currentUser);

    if (user) {
      setEmail(user.email);
      setName(user.name || "New User");
      setBio(user.bio || "No bio added yet.");
    }
  };

  const handleSave = async () => {
    if (!email) {
      Alert.alert("Error", "No user session found.");
      return;
    }

    const success = await updateUserProfile(email, name, bio);

    if (success) {
      if (Platform.OS === "web") {
        window.alert("Profile updated successfully!");
      } else {
        Alert.alert("Success", "Profile updated successfully!");
      }

      setIsEditing(false);
      await loadProfile();
    } else {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
      }
      return;
    }

    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("currentUser");
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#FFFFFF" />
          </View>
          <Text style={styles.nameDisplay}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {!isEditing ? (
          <View style={styles.profileViewContainer}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{bio}</Text>

            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter your bio"
              placeholderTextColor="#9CA3AF"
              multiline
            />

            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save Profile</Text>
            </Pressable>
          </View>
        )}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBF9",
  },
  header: {
    backgroundColor: "#1E5631",
    alignItems: "center",
    paddingVertical: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  nameDisplay: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#D1F2EB",
    fontWeight: "600",
  },
  profileViewContainer: {
    padding: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E5631",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: "#1E5631",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  formContainer: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E5631",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#1E5631",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 24,
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});