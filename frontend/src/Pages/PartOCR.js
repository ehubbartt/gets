import React, { useState } from "react";
import Header from "../Components/Header";
import OrderImage from "../Components/OrderImage";
import { postText } from "../services/get-text";
import AllText from "../Components/AllText";

import "../styles/part-ocr.css";

//TODO: comment all functions that are not already
//TODO: options for the result text. ex. split on spaces
const PartOCR = ({ title }) => {
  const [allText, setAllText] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [isTextLoading, setIsTextLoading] = useState(false);
  //TODO: change loading to be animated
  const postData = async () => {
    if (!imageBase64) {
      console.error("image does not exist");
      return;
    }
    setIsTextLoading(true);
    const data = await postText({ image: imageBase64 });
    setAllText(data);
    setIsTextLoading(false);
  };

  return (
    <>
      <Header title={title}></Header>
      <div id="ocr">
        <div id="ocr-container">
          <OrderImage postData={postData} setImageBase64={setImageBase64} />
          <AllText allText={allText} isTextLoading={isTextLoading} />
        </div>
      </div>
    </>
  );
};

export default PartOCR;
