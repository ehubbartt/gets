import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { postParsedText } from "../services/get-text";
import CameraContainer from "./CameraContainer";
import FileDrop from "./FileDrop";

const OrderImage = ({ order, setOrder }) => {
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  const postData = async () => {
    const data = await postParsedText({ image: imageBase64 });
    setOrder({ ...order, ...data });
  };

  return (
    <div id="image-main">
      <CameraSwitch
        isWebcamOpen={isWebcamOpen}
        setIsWebcamOpen={setIsWebcamOpen}
        showScreenshot={showScreenshot}
      />
      {!isWebcamOpen && !showScreenshot ? (
        <FileDrop postData={postData} setImageBase64={setImageBase64} />
      ) : (
        <CameraContainer
          postData={postData}
          isWebcamOpen={isWebcamOpen}
          setIsWebcamOpen={setIsWebcamOpen}
          showScreenshot={showScreenshot}
          setShowScreenshot={setShowScreenshot}
          setImageBase64={setImageBase64}
        />
      )}
    </div>
  );
};

const CameraSwitch = ({ isWebcamOpen, setIsWebcamOpen, showScreenshot }) => {
  return (
    <>
      {
        //render camera switch if screenshot is not active
        !showScreenshot && (
          <FormControlLabel
            className="form-control"
            control={
              <Switch
                name="camera"
                color="primary"
                checked={isWebcamOpen}
                onChange={() => {
                  setIsWebcamOpen(!isWebcamOpen);
                }}
              />
            }
            label={isWebcamOpen ? "Camera On" : "Camera Off"}
          />
        )
      }
    </>
  );
};

export default OrderImage;
