import React, { useState } from "react";
import Header from "../Components/Header";
import OrderImage from "../Components/OrderImage";
import { postText } from "../services/get-text";

const PartOCR = ({ title }) => {
  const [allText, setAllText] = useState([]);
  const [imageBase64, setImageBase64] = useState("");

  const postData = async () => {
    const data = await postText({ image: imageBase64 });
    console.log(data);
    setAllText(data);
  };

  return (
    <>
      <Header title={title}></Header>
      <div id="ocr">
        <div id="ocr-container">
          <OrderImage postData={postData} setImageBase64={setImageBase64} />
          <AllText allText={allText} />
        </div>
      </div>
    </>
  );
};

const AllText = ({ allText }) => {
  return (
    <div id="all-text-container">
      <h1>Text:</h1>
      {allText.map((text, idx) => {
        return <Text key={idx} text={text} />;
      })}
    </div>
  );
};

const Text = ({ text }) => {
  return <div id="text-container">{text}</div>;
};

export default PartOCR;
