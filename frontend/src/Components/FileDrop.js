import React, { useState, useRef } from "react";
import { BsImages } from "react-icons/bs";

const FileDrop = ({ postData, setImageBase64 }) => {
  const [imgSRC, setImgSRC] = useState();
  const fileInputRef = useRef();
  const imgRef = useRef();

  const dropHandler = (e) => {
    e.preventDefault();
    const data = e.dataTransfer;
    const items = data.items;
    if (checkIfOneFile(items)) {
      console.log("please only select one file");
      return;
    }

    if (items) {
      if (items[0].kind === "file") {
        var file = items[0].getAsFile();
        if (!checkIfImage(file.type)) {
          console.log("file is not an image");
          return;
        }
        handleFile(file);
      }
    }
  };

  const handleFile = (file) => {
    let fr = new FileReader();

    fr.onload = (e) => {
      setImgSRC(e.target.result);
      setImageBase64(
        e.target.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
      );
    };
    fr.readAsDataURL(file);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (checkIfOneFile(e.target.files)) {
      console.log("please only select one file");
      return;
    }
    if (!checkIfImage(e.target.files[0].type)) {
      console.log("file is not an image");
      return;
    }
    handleFile(e.target.files[0]);
  };

  const checkIfOneFile = (files) => {
    return files.length > 1;
  };

  const checkIfImage = (type) => {
    return (
      type === "image/jpeg" || type === "image/png" || type === "image/jpg"
    );
  };

  return (
    <>
      <div
        id="file-drop"
        onDrop={(e) => {
          dropHandler(e);
        }}
        onDragOver={(e) => {
          dragOverHandler(e);
        }}
        style={
          imgSRC && {
            aspectRatio: `${imgRef.naturalWidth}/${imgRef.naturalHeight}`,
          }
        }
        onClick={() => {
          imgSRC && handleFileClick();
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {imgSRC ? (
          <img src={imgSRC} alt="order" id="selected-image" ref={imgRef} />
        ) : (
          <>
            <BsImages className="image-icon" />
            <h4 className="file-drop-text">Drag file to upload</h4>
            <h3 className="file-drop-text">OR</h3>
            <button className="btn" onClick={handleFileClick}>
              Browse Files
            </button>
          </>
        )}
      </div>
      {imgSRC ? (
        <button className="btn" onClick={postData}>
          Submit Image
        </button>
      ) : null}
    </>
  );
};

export default FileDrop;
