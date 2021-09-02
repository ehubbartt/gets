"use strict";
import express from "express";
const app = express();
import mongoose from "mongoose";
import { OrderModel } from "./models/job-list-model.js";
import { splitOnColon, createParsedText } from "./functions/parsingText.js";
import { toArrayBuffer } from "./functions/array-buffer.js";

import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

import multer from "multer";
var upload = multer();

/**
 * personal auth tokens
 * please put your own auth key and endpoint here so that we don't flood
 * the same api calls
 */
const key = "8e7cc8f3e2d146638f14f211574c76a3";
const endpoint = "https://gets.cognitiveservices.azure.com/";
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

app.use(express.static("public"));
app.use("/files", express.static("files"));

app.use(express.urlencoded({ extended: true }));

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
 * returns all the lines from the API request from an image
 * BODY: form data of a file/blob
 */
app.post("api/image/lines", upload.single("blob"), async (req, res) => {
  const arrayBuffer = toArrayBuffer(req.file.buffer);

  let result = await computerVisionClient.readInStream(arrayBuffer);
  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;

  const lines = data[0].lines;
  console.log(lines);
  try {
    res.send(lines);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * returns all the lines from the API request
 * BODY: form data of a file/blob
 * TODO: before prod there needs to be error catching
 */
app.post("/api/image/parsed-text", upload.single("blob"), async (req, res) => {
  const arrayBuffer = toArrayBuffer(req.file.buffer);
  let allText = [];

  let result = await computerVisionClient.readInStream(arrayBuffer);
  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;

  const lines = data[0].lines;
  allText = splitOnColon(lines);

  const parsedText = createParsedText(allText);
  try {
    res.send(parsedText);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * returns all the lines from the API request
 * BODY: form data of a file/blob
 */
app.post("/api/image/text", upload.single("blob"), async (req, res) => {
  const arrayBuffer = toArrayBuffer(req.file.buffer);

  let result = await computerVisionClient.readInStream(arrayBuffer);
  let operation = result.operationLocation.split("/").slice(-1)[0];

  while (result.status !== STATUS_SUCCEEDED) {
    result = await computerVisionClient.getReadResult(operation);
  }
  const data = result.analyzeResult.readResults;

  const lines = data[0].lines;
  const allText = splitOnColon(lines);
  try {
    res.send(allText);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/all-orders", async (req, res) => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const orders = await OrderModel.find({});
    mongoose.connection.close();
    res.send(orders);
  } catch (error) {
    console.log(error._message);
    res.status(422).send({ error: error._message });
  }
});

app.post("/create-order", async (req, res) => {
  const order = req.body;
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const response = await OrderModel.create(order);
    res.json(response);
  } catch (error) {
    console.log(error._message);
    res.status(422).send({ error: error._message });
  }
});

app.post("/remove-order", async (req, res) => {
  const id = req.body.id;
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const response = await OrderModel.deleteOne({ _id: `${id}` });
    res.json(response);
  } catch (error) {
    console.log(error._message);
    res.status(422).send({ error: error._message });
  }
});

app.listen(5000);
