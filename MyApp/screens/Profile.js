import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    sirname: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("UserID");
      if (storedValue !== null) {
        console.log("Retrieved data:", storedValue);
        setValue(storedValue);
      }
    } catch (e) {
      console.error("Failed to retrieve data", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://d070-103-167-38-141.ngrok-free.app/api/profile/${value}`,
          { mode: "no-cors" }
        );
        if (!response.ok) {
          console.log("Network response was not ok : ", response.status);
          // throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.User);
        console.log("response", result.User);
      } catch (err) {
        // setError(err.message);
        console.log("Error :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [value]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
      <Text></Text>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/Images/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{`${data.name} ${data.sirname}`}</Text>
        <Text style={styles.email}>{data.email}</Text>
        {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name:</Text>
          <Text style={styles.infoValue}>{`${data.name} ${data.sirname}`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{data.email}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Button
          style={{ margin: 20 }}
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default Profile;
