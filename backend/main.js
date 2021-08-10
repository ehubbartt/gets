"use strict";
// URL images containing printed and/or handwritten text.
// The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
const getsTestUrl = "https://i.imgur.com/cAke54O.jpg";
import express from "express";
const app = express();
import mongoose from "mongoose";
import mongodb from "mongodb";
import { OrderModel } from "./models/job-list-model.js";
import { splitOnColon, createParsedText } from "./functions/parsingText.js";

import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

/**
 * personal auth tokens
 * please put your own auth key and endpoint here so that we don't flood
 * the same api calls
 */
const key = "d975bfc53a0344559b65c73af2f67fc3";
const endpoint = "https://gets-test.cognitiveservices.azure.com/";
const mongoURI =
  "mongodb+srv://admin:admin@gets.ogmrc.mongodb.net/gets?retryWrites=true&w=majority";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

// Status strings returned from Read API. NOTE: CASING IS SIGNIFICANT.
// Before Read 3.0, these are "Succeeded" and "Failed"
const STATUS_SUCCEEDED = "succeeded";
const STATUS_FAILED = "failed";

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

/**
 * returns all the lines from the API request
 * BODY: pass in a json object in the format of... {"url" : "<image-address>"}
 */
app.post("/lines", async (req, res) => {
  const URL = req.body.url;
  let result = await computerVisionClient.read(URL);

  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;

  const lines = data[0].lines;
  res.send(lines);
});

/**
 * post req of http://localhost:5000/param
 * returns all the text from the image in an array
 * BODY: pass in a json object in the format of... {"url" : "<image-address>"}
 */
app.post("/text", async (req, res) => {
  const URL = req.body.url;
  let result = await computerVisionClient.read(URL);

  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;

  for (const page in data) {
    if (data.length > 1) {
      // TODO:console.log(`==== Page: ${page}`); need to implement multiple page support
    }
    const lines = data[page].lines;
    const allText = splitOnColon(lines);
    res.send(allText);
  }
});

/**
 * returns a parsed version of all the text from the image in an object
 * containing only the text that we want from the image instead of all the text
 *
 * check ../data for more info on the keys
 *
 * BODY: pass in a json object in the format of... {"url" : "<image-address>"}
 */
app.post("/text/parsed", async (req, res) => {
  let allText = [];

  const URL = req.body.url;
  let result = await computerVisionClient.read(URL);

  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;
  for (const page in data) {
    if (data.length > 1) {
      // console.log(`==== Page: ${page}`); need to implement multiple page support
    }
    const lines = data[page].lines;
    allText = splitOnColon(lines);
  }
  //TODO: need to implement something where if there are multiple matches for a key it will give both options
  const parsedText = createParsedText(allText);
  res.send(parsedText);
});

app.get("/all-orders", async (req, res) => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const orders = await OrderModel.find({});
  mongoose.connection.close();
  res.send(orders);
});

app.post("/create-order", async (req, res) => {
  const order = req.body;
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await OrderModel.create(order);
  res.json(response);
});

app.listen(5000);
