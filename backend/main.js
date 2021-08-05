"use strict";
// URL images containing printed and/or handwritten text.
// The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
const getsTestUrl = "https://i.imgur.com/cAke54O.jpg";
const express = require("express");
const app = express();

const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

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

// Perform read and await the result from URL
async function readTextFromURL(client, url) {
  // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
  let result = await client.read(url);
  // Operation ID is last path segment of operationLocation (a URL)
  let operation = result.operationLocation.split("/").slice(-1)[0];

  // Wait for read recognition to complete
  // result.status is initially undefined, since it's the result of read
  while (result.status !== STATUS_SUCCEEDED) {
    result = await client.getReadResult(operation);
  }
  return result.analyzeResult.data; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
}

// Prints all text from Read result
function printRecText(data) {
  console.log("Recognized text:");
  for (const page in data) {
    if (data.length > 1) {
      console.log(`==== Page: ${page}`);
    }
    const result = data[page];
    if (result.lines.length) {
      for (const line of result.lines) {
        console.log(line.words.map((w) => w.text).join(" "));
      }
    } else {
      console.log("No recognized text.");
    }
  }
}

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
    "https://i.imgur.com/Mjf8um5.jpg"
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
    const results = data[page].lines;
    for (let i = 0; i < results.length; i++) {
      allText.push(results[i].text);
    }
  }
  res.send(allText);
});

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
    const results = data[page].lines;
    for (let i = 0; i < results.length; i++) {
      allText.push(results[i].text);
    }
  }
  res.send(allText);
});

app.post("/text/parsed", async (req, res) => {
  const allText = [];
  const parsedText = {};

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
    const results = data[page].lines;
    for (let i = 0; i < results.length; i++) {
      allText.push(results[i].text);
    }
  }
  for (let i = 0; i < allText.length; i++) {
    if (allText[i].toLowerCase() === "date code:") {
      parsedText.dateCode = allText[i + 1];
    }
    if (allText[i].toLowerCase() === "cust p/n:") {
      parsedText.partNumber = allText[i + 1];
    }
    if (allText[i].toLowerCase() === "cust po :") {
      parsedText.custPO = allText[i + 1];
    }
    if (allText[i].toLowerCase() === "quantity:") {
      parsedText.quantity = allText[i + 1];
    }
    if (allText[i].toLowerCase() === "sales order :") {
      parsedText.salesOrder = allText[i + 1];
    }
  }
  res.send(parsedText);
});

app.listen(5000);
