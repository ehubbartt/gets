import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { postParsedText } from "../services/getData";

/**
 * TODO:clear inputs on modal load
 * @returns
 */
const Modal = () => {
  const { isModalOpen, closeModal, setJobs, jobs } = useGlobalContext();

  const [priority, setPriority] = useState(1);
  const [name, setName] = useState("default name");
  const [dc, setDc] = useState();
  const [pn, setPn] = useState();
  const [so, setSo] = useState();
  const [date, setDate] = useState("01/01/2021");
  const [URL, setURL] = useState("");

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    setDate(today);
  }, []);

  const postData = async () => {
    const data = await postParsedText({
      url: URL,
    });
    setDc(data.dateCode);
    setPn(data.partNumber);
    setSo(data.salesOrder);
  };

  const handleSubmitURL = () => {
    postData();
  };

  const handleSubmitJob = () => {
    setPriority(1);
    setName("default name");
    setDc();
    setPn();
    setSo();
    setURL("");
  };

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <Title />
        <URLInput setURL={setURL} handleSubmitURL={handleSubmitURL} URL={URL} />
        <Inputs
          setPriority={setPriority}
          setName={setName}
          setDc={setDc}
          setPn={setPn}
          setSo={setSo}
          dc={dc}
          pn={pn}
          so={so}
        />
        <button
          className="btn submit-btn"
          onClick={() => {
            setJobs([
              ...jobs,
              {
                id: uuidv4(),
                priority: priority,
                name: name,
                dc: dc,
                pn: pn,
                so: so,
                date: date,
              },
            ]);
            closeModal();
            handleSubmitJob();
          }}
        >
          SUBMIT
        </button>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  );
};

const Title = () => {
  return (
    <div className="title" id="modal-title">
      <h1>Add a New Job</h1>
    </div>
  );
};

const Inputs = ({ setPriority, setName, setDc, setPn, setSo, dc, so, pn }) => {
  return (
    <div id="input-container">
      <div className="form-group">
        <span>Priority</span>
        <input
          className="form-field"
          id="priority-input"
          placeholder="1"
          type="text"
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <span>Name</span>
        <input
          className="form-field"
          id="name-input"
          type="text"
          placeholder="default name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <span>DC</span>
        <input
          className="form-field"
          id="dc-input"
          type="text"
          value={dc || ""}
          placeholder="Date Code"
          onChange={(e) => {
            setDc(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <span>PN</span>
        <input
          className="form-field"
          id="pn-input"
          type="text"
          value={pn || ""}
          placeholder="Part Number"
          onChange={(e) => {
            setPn(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <span>SO</span>
        <input
          className="form-field"
          id="so-input"
          type="text"
          value={so || ""}
          placeholder="Sales Order"
          onChange={(e) => {
            setSo(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

const URLInput = ({ setURL, handleSubmitURL, URL }) => {
  return (
    <div id="url-input">
      <div className="form-group" id="user-url-input">
        <span>URL</span>
        <input
          className="form-field"
          id="image-input"
          type="text"
          value={URL || ""}
          placeholder="Image URL"
          onChange={(e) => {
            setURL(e.target.value);
          }}
        />
        <span className="btn" id="url-submit" onClick={handleSubmitURL}>
          Submit
        </span>
      </div>
    </div>
  );
};

export default Modal;
