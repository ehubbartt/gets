"use strict";
// URL images containing printed and/or handwritten text.
// The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
const getsTestUrl = "https://i.imgur.com/cAke54O.jpg";
import express from "express";
const app = express();
import { doesInclude } from "./functions/parsingText.js";

import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

/**
 * personal auth tokens
 */
const key = "d975bfc53a0344559b65c73af2f67fc3";
const endpoint = "https://gets-test.cognitiveservices.azure.com/";

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

app.get("/text", async (req, res) => {
  const allText = [];
  let result = await computerVisionClient.read(
    "https://i.imgur.com/cAke54O.jpg"
  );

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
    for (let i = 0; i < lines.length; i++) {
      let text = lines[i].text;
      if (text.includes(":") && text.charAt(text.length - 1) !== ":") {
        let split = text.split(":");
        for (let j = 0; j < split.length; j++) {
          allText.push(split[j]);
        }
      } else {
        allText.push(text);
      }
    }
  }
  res.send(allText);
});

const test = () => {
  console.log("test is working");
};

app.post("/text", async (req, res) => {
  const allText = [];
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
    for (let i = 0; i < lines.length; i++) {
      let text = lines[i].text;
      if (text.includes(":") && text.charAt(text.length - 1) !== ":") {
        let split = text.split(":");
        for (let j = 0; j < split.length; j++) {
          allText.push(split[j]);
        }
      } else {
        allText.push(text);
      }
    }
  }
  res.send(allText);
});

app.post("/text/parsed", async (req, res) => {
  const allText = [];

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
    for (let i = 0; i < lines.length; i++) {
      let text = lines[i].text;
      if (text.includes(":") && text.charAt(text.length - 1) !== ":") {
        let split = text.split(":");
        for (let j = 0; j < split.length; j++) {
          allText.push(split[j]);
        }
      } else {
        allText.push(text);
      }
    }
  }
  let parsedText = {};
  for (let i = 0; i < allText.length; i++) {
    const code = doesInclude(allText[i].toLowerCase());
    if (code) {
      let nextWord = allText[i + 1];
      nextWord = nextWord.replace(" ", "");
      if (code === "dateCode") {
        nextWord = nextWord.substring(0, 4);
      }
      parsedText[`${code}`] = nextWord;
    }
  }
  res.send(parsedText);
});

app.listen(5000);
