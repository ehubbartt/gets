import React, { useState, useRef } from "react";

const FileDrop = ({ postData, setImageBase64 }) => {
  const [imgSRC, setImgSRC] = useState();
  const fileInputRef = useRef();

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
        onClick={handleFileClick}
        onDrop={(e) => {
          dropHandler(e);
        }}
        onDragOver={(e) => {
          dragOverHandler(e);
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {imgSRC ? (
          <img src={imgSRC} alt="order" id="selected-image" />
        ) : (
          <h4 id="file-drop-text">Drag file to upload or click</h4>
        )}
      </div>
      <button className="btn" onClick={postData}>
        Submit Image
      </button>
    </>
  );
};

export default FileDrop;
