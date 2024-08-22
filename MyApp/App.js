import React from "react";
import AppNavigator from "./AppNavigator";
import axios from "axios";
axios.defaults.baseURL =
  "https://iot-with-esp8266-and-react-netive.onrender.com/";
export default function App() {
  return <AppNavigator />;
}
