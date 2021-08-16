import React, { useRef, useCallback } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useGlobalContext } from "../context";
import Webcam from "react-webcam";

const CameraContainer = () => {
  const webcamRef = useRef(null);
  const {
    isWebcamOpen,
    setIsWebcamOpen,
    showScreenshot,
    setShowScreenshot,
    imgSRC,
    setImgSRC,
  } = useGlobalContext();

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSRC(imageSrc);
    setShowScreenshot(true);
    setIsWebcamOpen(false);
  }, [webcamRef, setImgSRC, setIsWebcamOpen, setShowScreenshot]);

  const back = () => {
    setShowScreenshot(false);
    setIsWebcamOpen(true);
  };

  return (
    <div id="camera-container">
      {
        //render camera switch if screenshot is not active
        !showScreenshot && (
          <FormControlLabel
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
      <div className="camera-outline">
        {
          //if screnshot is not active render webcam else render screenshot
          !showScreenshot ? (
            isWebcamOpen && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              ></Webcam>
            )
          ) : (
            <img src={imgSRC} alt="screenshot" />
          )
        }
      </div>
      <div className="camera-buttons">
        {
          //if webcam is active, show snap button
          isWebcamOpen && (
            <div className="btn" onClick={capture}>
              Snap
            </div>
          )
        }

        {
          //if screenshot is active, show back and submit button
          showScreenshot && (
            <>
              <div className="btn" onClick={back}>
                Back
              </div>
              {/* <div className="btn">Submit Image</div> */}
            </>
          )
        }
      </div>
    </div>
  );
};

export default CameraContainer;
