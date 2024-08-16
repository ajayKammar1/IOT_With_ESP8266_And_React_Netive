import React, { useState } from "react";
// import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const Register = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    sirname: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddData = (e) => {
    e.preventDefault();

    fetch("https://d070-103-167-38-141.ngrok-free.app/api/register/", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Success", "Data registered successfully");
        console.log(data);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to store data");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={data.name}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your sirname"
            value={data.sirname}
            onChangeText={(value) => handleChange("sirname", value)}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={data.email}
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={data.password}
            onChangeText={(value) => handleChange("password", value)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddData}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an Account?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
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
  title: {
    marginBottom: 20,
    fontSize: 24,
    color: "#333",
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
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 5,
    width: "100%",
    textAlign: "center",
  },
});

export default Register;
