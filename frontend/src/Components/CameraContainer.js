import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraContainer = ({
  postData,
  isWebcamOpen,
  setIsWebcamOpen,
  setImageBase64,
  setShowScreenshot,
  showScreenshot,
  isWebcamLoading,
  setIsWebcamLoading,
}) => {
  const webcamRef = useRef(null);
  const [imgSRC, setImgSRC] = useState("");
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const back = () => {
    setShowScreenshot(false);
    setIsWebcamOpen(true);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageBase64(imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""));
    setImgSRC(imageSrc);
    setShowScreenshot(true);
    setIsWebcamOpen(false);
  };

  return (
    <>
      <div
        className={
          isWebcamOpen || showScreenshot
            ? "camera-container"
            : "camera-container hidden"
        }
      >
        {
          //if screenshot is not active render webcam else render screenshot
          !showScreenshot ? (
            isWebcamOpen && (
              <>
                {isWebcamLoading ? <div>Loading...</div> : null}
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMedia={() => {
                    setTimeout(() => {
                      setIsWebcamLoading(false);
                    }, 500);
                  }}
                ></Webcam>
              </>
            )
          ) : (
            <img src={imgSRC} alt="screenshot" id="screenshot" />
          )
        }
      </div>
      <CameraButtons
        isWebcamOpen={isWebcamOpen}
        capture={capture}
        back={back}
        showScreenshot={showScreenshot}
        postData={postData}
        isWebcamLoading={isWebcamLoading}
      />
    </>
  );
};

const CameraButtons = ({
  isWebcamOpen,
  capture,
  back,
  showScreenshot,
  postData,
  isWebcamLoading,
}) => {
  return (
    <div className="camera-buttons">
      {
        //if webcam is active, show snap button
        //TODO: handle if webcam is not loaded yet
        isWebcamOpen &&
          (isWebcamLoading ? null : (
            <div className="btn" onClick={capture}>
              Snap
            </div>
          ))
      }

      {
        //if screenshot is active, show back and submit button
        showScreenshot && (
          <>
            <div className="btn" onClick={back}>
              Back
            </div>
            <div className="btn" onClick={postData}>
              Submit Image
            </div>
          </>
        )
      }
    </div>
  );
};

export default CameraContainer;
