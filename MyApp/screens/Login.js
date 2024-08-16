import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://d070-103-167-38-141.ngrok-free.app/api/login",
        // "http://localhost:5000/api/login",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(result);

      const result = await response.json();
      if (!result.message) {
        Alert.alert("Error", result.error);
      } else {
        await AsyncStorage.setItem("UserID", result.user._id);
        console.log();
        Alert.alert("Success", "logined successfully");
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Error", "logined failed");
      console.log("error :", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    color: "#333",
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 8,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    width: "100%",
    padding: 12,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#007bff",
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
  },
  details: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: "#555",
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#777",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginTop: 5,
    width: "100%",
    textAlign: "center",
  },
});

export default Login;
