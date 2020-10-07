import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
axios.defaults.baseURL =
  "http://localhost:5000/bmi-app-9af6e/asia-southeast2/api";

export default function home() {
  const state = {
    res_bmi: 0,
    res_cat: "",
  };
  const check_to_post = (weight, height) => {
    console.log(weight);
    console.log(height);

    if (weight === null || height === null) {
      // alert for react-native web
      alert("Error, data is incomplete.");
      // alert for react-native mobile
      Alert.alert("Error...", "Data incomplete...", [
        { text: "Okay", onPress: () => console.log("Alert closed") },
      ]);
    } else {
      let weightNum = parseFloat(weight);
      let heightNum = parseFloat(height);

      if (!weightNum > 0 || !heightNum > 0) {
        // alert for react-native web
        alert("Error, data must be valid number.");
        // alert for react-native mobile
        Alert.alert("Error...", "Data must be valid number...", [
          { text: "Okay", onPress: () => console.log("Alert closed") },
        ]);
      } else {
        // some code here
        axios
          .post("/bmi", {
            weight: weightNum,
            height: heightNum,
          })
          .then((res) => {});
      }
    }
  };

  const _value = {
    weight: null,
    height: null,
  };

  return (
    <View style={styles.container}>
      <Text>Weight in kilograms: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 50"
        onChangeText={(val) => (_value.weight = val)}
      />
      <Text>Height in centimeters: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 160"
        onChangeText={(val) => (_value.height = val)}
      />
      <TouchableOpacity>
        <Button
          onPress={() => {
            check_to_post(_value.weight, _value.height);
          }}
          title="Submit"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ded",
  },
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
    color: "coral",
  },
});
