import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useGlobalContext } from "../context";
import { postParsedText } from "../services/get-text";
import CameraContainer from "./CameraContainer";
import FileDrop from "./FileDrop";

const OrderImage = () => {
  const {
    isWebcamOpen,
    setIsWebcamOpen,
    showScreenshot,
    imageBase64,
    setOrder,
    order,
  } = useGlobalContext();

  const postData = async () => {
    const data = await postParsedText({ image: imageBase64 });
    console.log(data);
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
        <FileDrop postData={postData} />
      ) : (
        <CameraContainer postData={postData} />
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
