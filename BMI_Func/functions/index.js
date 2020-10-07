const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// const countBMIV2 = (req, res) => {
const countBMI = (req, res) => {
  const userData = {
    weight: req.body.weight,
    height: req.body.height,
  };

  if (userData.weight == null || userData.height == null) {
    return res.status(400).json({ error: "Data is not complete" });
  }

  BMIWeight = parseFloat(userData.weight);
  BMIHeight = parseFloat(userData.height) / 100.0;
  if (!BMIHeight > 0 || !BMIWeight > 0) {
    return res.status(400).json({ error: "Data must be a number" });
  }

  const returnData = {
    bmi: 0,
    category: "",
  };
  returnData.bmi = BMIWeight / (BMIHeight * BMIHeight);

  const BMIRating = {
    lowest: "Very severely underweight",
    v_low: "Very underweight",
    low: "Underweight",
    norm: "Normal",
    high: "Overweight",
    v_high1: "Obese Class I (Moderately obese)",
    v_high2: "Obese Class II (Severely obese)",
    highest: "Obese Class III (Very severely obese)",
  };

  if (returnData.bmi < 15) {
    returnData.category = BMIRating.lowest;
  } else if (returnData.bmi < 16) {
    returnData.category = BMIRating.v_low;
  } else if (returnData.bmi < 18.5) {
    returnData.category = BMIRating.low;
  } else if (returnData.bmi < 25) {
    returnData.category = BMIRating.norm;
  } else if (returnData.bmi < 30) {
    returnData.category = BMIRating.high;
  } else if (returnData.bmi < 35) {
    returnData.category = BMIRating.v_high1;
  } else if (returnData.bmi < 40) {
    returnData.category = BMIRating.v_high2;
  } else {
    returnData.category = BMIRating.highest;
  }

  return res.json({ returnData });
};

app.post("/bmi", countBMI);

app.all("*", (req, res, next) => {
  res.status(403).send({ error: "Forbidden" });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
