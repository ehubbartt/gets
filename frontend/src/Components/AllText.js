import React, { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { Circles } from "react-loading-icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AllText = (props) => {
  const { allText, isTextLoading } = props;
  const [curAllText, setCurAllText] = useState([]);
  const [breakOnSpace, setBreakOnSpace] = useState(false);

  React.useEffect(() => {
    if (breakOnSpace) {
      setCurAllText(splitSpace(allText));
    } else {
      setCurAllText(allText);
    }
    // eslint-disable-next-line
  }, [allText]);

  const splitSpace = (allText) => {
    let curAllText = [];
    for (let i = 0; i < allText.length; i++) {
      let text = allText[i].split(" ");
      for (let j = 0; j < text.length; j++) {
        if (text[j].length > 0) {
          curAllText.push(text[j]);
        }
      }
    }
    setCurAllText(curAllText);
    return curAllText;
  };

  const handleBreakOnSpaceChange = () => {
    setBreakOnSpace(!breakOnSpace);
    if (!breakOnSpace) {
      setCurAllText(splitSpace(allText));
    } else {
      setCurAllText(allText);
    }
  };

  const copyText = async (e) => {
    let text = "";
    if (e.target.id === "clip") {
      text = e.target.parentElement.textContent;
    } else {
      text = e.target.textContent;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        console.log(`Copying ${text} to clipboard was successful!`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="container">
      <Settings
        breakOnSpace={breakOnSpace}
        handleBreakOnSpaceChange={handleBreakOnSpaceChange}
      />
      <div id="all-text-container">
        {isTextLoading ? (
          <Circles fill="#678efe" className="loading-icon" />
        ) : (
          curAllText.map((text, idx) => {
            return (
              <Text key={idx} text={text} {...props} copyText={copyText} />
            );
          })
        )}
      </div>
      {curAllText.length > 0 ? (
        <p className="results">{`${curAllText.length} words found`}</p>
      ) : null}
    </div>
  );
};

const Text = ({ text, copyText }) => {
  return (
    <>
      <div id="text-container" onClick={copyText}>
        <p className="copy-text">{text}</p>
        {<FiClipboard className="hidden clipboard-icon" id="clip" />}
      </div>
    </>
  );
};

const Settings = ({ breakOnSpace, handleBreakOnSpaceChange }) => {
  return (
    <div className="all-text-settings">
      <FormControlLabel
        label={"Break on Space"}
        control={
          <Switch
            name="break-on-space"
            color="primary"
            checked={breakOnSpace}
            onChange={handleBreakOnSpaceChange}
          />
        }
      ></FormControlLabel>
    </div>
  );
};

export default AllText;
