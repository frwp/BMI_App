import React, { useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
axios.defaults.baseURL =
  "http://localhost:5000/bmi-app-9af6e/asia-southeast2/api";

export default function Sandbox() {
  const [text, setText] = useState("");

  axios
    .post("/bmi", {
      weight: 40,
      height: 120,
    })
    .then((res) => {
      setText(res.data.returnData.bmi);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
