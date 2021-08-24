import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CameraContainer from "./CameraContainer";
import FileDrop from "./FileDrop";

const OrderImage = ({ postData, setImageBase64 }) => {
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isWebcamLoading, setIsWebcamLoading] = useState(false);

  return (
    <div id="image-main">
      <CameraSwitch
        isWebcamOpen={isWebcamOpen}
        setIsWebcamOpen={setIsWebcamOpen}
        showScreenshot={showScreenshot}
        setIsWebcamLoading={setIsWebcamLoading}
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
          isWebcamLoading={isWebcamLoading}
          setIsWebcamLoading={setIsWebcamLoading}
        />
      )}
    </div>
  );
};

const CameraSwitch = ({
  isWebcamOpen,
  setIsWebcamOpen,
  showScreenshot,
  setIsWebcamLoading,
}) => {
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
                  setIsWebcamLoading(true);
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
