import React, { useState } from "react";
import Header from "../Components/Header";
import OrderImage from "../Components/OrderImage";
import { postText } from "../services/get-text";
import { FiClipboard } from "react-icons/fi";

//TODO: comment all functions that are not already'
//TODO: look for things that are not needed in functions and files
const PartOCR = ({ title }) => {
  const [allText, setAllText] = useState([]);
  const [imageBase64, setImageBase64] = useState("");

  const postData = async () => {
    const data = await postText({ image: imageBase64 });
    setAllText(data);
  };

  const copyText = async (e) => {
    const text = e.target.innerHTML;
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <Header title={title}></Header>
      <div id="ocr">
        <div id="ocr-container">
          <OrderImage postData={postData} setImageBase64={setImageBase64} />
          <AllText allText={allText} copyText={copyText} />
        </div>
      </div>
    </>
  );
};

//TODO: style the text output
const AllText = (props) => {
  const { allText } = props;
  return (
    <div id="all-text-container">
      <h1>Text:</h1>
      {allText.map((text, idx) => {
        return <Text key={idx} text={text} {...props} />;
      })}
    </div>
  );
};

const Text = ({ text, copyText }) => {
  return (
    <div id="text-container" onClick={copyText}>
      <p className="copy-text">{text}</p>
      {<FiClipboard className="hidden clipboard-icon" />}
    </div>
  );
};

export default PartOCR;
