import React, { useState, Component } from "react";
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
  "https://asia-southeast2-bmi-app-9af6e.cloudfunctions.net/api";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      category: "null",
      age: "",
      weight: "",
      height: "",
      loading: false,
      result: false,
      errors: {},
    };
  }

  check_to_post = () => {
    // console.log(this.state.height + "\n" + this.state.weight);
    if (this.state.weight == "" || this.state.height == "") {
      // alert for react-native web
      alert("Error, data is incomplete.");
      // alert for react-native mobile
      Alert.alert("Error...", "Data incomplete...", [
        { text: "Okay", onPress: () => console.log("Alert closed") },
      ]);
      this.setState({ result: false });
    } else {
      let weightNum = this.state.weight;
      let heightNum = this.state.height;

      if (
        isNaN(weightNum) ||
        isNaN(heightNum) ||
        !weightNum > 0 ||
        !heightNum > 0
      ) {
        // alert for react-native web
        alert("Error, data must be valid number.");
        // alert for react-native mobile
        Alert.alert("Error...", "Data must be valid number...", [
          { text: "Okay", onPress: () => console.log("Alert closed") },
        ]);
        this.setState({ result: false });
      } else {
        this.submitValue();
      }
    }
  };

  submitValue = () => {
    // console.log(this.state.height + " " + this.state.weight);
    axios
      .post("/bmi", {
        weight: this.state.weight,
        height: this.state.height,
      })
      .then((res) => {
        this.setState({
          value: res.data.returnData.bmi,
          category: res.data.returnData.category,
          result: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ result: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ textAlign: "center", marginBottom: 15 }}>
          <Text style={styles.title}>Body Mass Index Calculator</Text>
          <Text style={styles.subtitle}>
            Made using: React-native, Express, Firebase
          </Text>
          <Text style={styles.details}>
            by: Fransiskus Rian Wardana Putra || 18/427592/PA/18552
          </Text>
        </View>
        <Text>Weight in kilograms: </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 50"
          value={this.state.weight}
          keyboardType={"numeric"}
          onChangeText={(weight) => this.setState({ weight })}
        />
        <Text>Height in centimeters: </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 160"
          value={this.state.height}
          keyboardType={"numeric"}
          onChangeText={(height) => this.setState({ height })}
        />
        <TouchableOpacity>
          <Button onPress={this.check_to_post} title="Submit" />
        </TouchableOpacity>
        {this.state.result && (
          <View style={styles.box}>
            <Text>BMI Index: {this.state.value.toFixed(2)}</Text>
            <Text>Category: {this.state.category}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    // textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ded",
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    color: "coral",
    borderWidth: 5,
    borderRadius: 7,
    maxHeight: 350,
  },
  box: {
    textAlign: "center",
    paddingTop: 10,
  },
  subtitle: {
    fontStyle: "italic",
  },
});
