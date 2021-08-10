import React, { useState, useEffect } from "react";
import { postParsedText } from "../services/get-text";
import { useGlobalContext } from "../context";
import { createOrder } from "../services/orders.db";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * @returns job inputs to be placed inside the modal
 */
const JobInputs = () => {
  const {
    setIsJobInputModalOpen,
    jobs,
    setJobs,
    closeJobInputModal,
    order,
    setOrder,
  } = useGlobalContext();

  const [date, setDate] = useState("01/01/2021");
  const [URL, setURL] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    setDate(today);
    setOrder({ ...order, date: date });
  }, []);

  const postData = async () => {
    setIsImageLoading(true);
    const data = await postParsedText({
      url: URL,
    });
    setIsImageLoading(false);
    setOrder({ ...order, ...data });
    console.log(order);
  };

  const handleSubmitURL = () => {
    postData();
  };

  useEffect(() => {
    const abortController = new AbortController();
    const handleSubmitJob = async () => {
      closeJobInputModal();
      setIsJobInputModalOpen(false);
      setURL("");
      setOrder({ date: date });
    };
    if (isOrdersLoading) {
      const fetchData = async () => {
        try {
          const curOrder = await createOrder(order);
          setJobs([...jobs, curOrder]);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
      handleSubmitJob();
    }
    return () => {
      abortController.abort();
    };
  }, [isOrdersLoading]);

  return (
    <>
      <Title />
      <URLInput
        setURL={setURL}
        handleSubmitURL={handleSubmitURL}
        URL={URL}
        isImageLoading={isImageLoading}
      />
      <Inputs order={order} setOrder={setOrder} />
      <button
        className="btn submit-btn"
        onClick={() => {
          setIsOrdersLoading(true);
        }}
      >
        SUBMIT
      </button>
    </>
  );
};

const Title = () => {
  return (
    <div className="title" id="modal-title">
      <h1>Add a New Job</h1>
    </div>
  );
};

const Inputs = ({ order, setOrder }) => {
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
            setOrder({ ...order, priority: e.target.value });
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
            setOrder({ ...order, name: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <span>DC</span>
        <input
          className="form-field"
          id="dc-input"
          type="text"
          value={order.dc || ""}
          placeholder="Date Code"
          onChange={(e) => {
            setOrder({ ...order, dc: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <span>PN</span>
        <input
          className="form-field"
          id="pn-input"
          type="text"
          value={order.pn || ""}
          placeholder="Part Number"
          onChange={(e) => {
            setOrder({ ...order, pn: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <span>SO</span>
        <input
          className="form-field"
          id="so-input"
          type="text"
          value={order.so || ""}
          placeholder="Sales Order"
          onChange={(e) => {
            setOrder({ ...order, so: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

const URLInput = ({ setURL, handleSubmitURL, URL, isImageLoading }) => {
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
          {isImageLoading ? (
            <CircularProgress size={20} style={{ color: "#fff" }} />
          ) : (
            "Submit"
          )}
        </span>
      </div>
    </div>
  );
};

export default JobInputs;
