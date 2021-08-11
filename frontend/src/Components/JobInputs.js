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
    areInputsOkay,
    setAreInputsOkay,
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
    setOrder({ ...order, date: today });
    // eslint-disable-next-line
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

  const handleSubmitJob = async () => {
    closeJobInputModal();
    setIsJobInputModalOpen(false);
    setOrder({ date: date });
    setURL("");
  };

  const checkIfAllOkay = (curAreInputsOkay) => {
    return (
      curAreInputsOkay.priority &&
      curAreInputsOkay.name &&
      curAreInputsOkay.dc &&
      curAreInputsOkay.pn &&
      curAreInputsOkay.so
    );
  };

  const checkSubmitJob = () => {
    const curAreInputsOkay = areInputsOkay;
    if (!order.priority) {
      curAreInputsOkay.priority = false;
    }
    if (!order.name) {
      curAreInputsOkay.name = false;
    }
    if (!order.dc) {
      curAreInputsOkay.dc = false;
    }
    if (!order.pn) {
      curAreInputsOkay.pn = false;
    }
    if (!order.so) {
      curAreInputsOkay.so = false;
    }
    setAreInputsOkay(curAreInputsOkay);
    console.log(curAreInputsOkay);
    return checkIfAllOkay(curAreInputsOkay);
  };

  //FIXME: there is a memory leak here if you refresh the page too fast
  useEffect(() => {
    const abortController = new AbortController();
    if (isOrdersLoading) {
      const isSubmitOkay = checkSubmitJob();
      console.log(isSubmitOkay);
      if (isSubmitOkay) {
        const fetchData = async () => {
          try {
            console.log(order);
            const curOrder = await createOrder(order);
            setJobs([...jobs, curOrder]);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
        handleSubmitJob();
      }
    }
    setIsOrdersLoading(false);
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
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
      <Inputs
        order={order}
        setOrder={setOrder}
        setAreInputsOkay={setAreInputsOkay}
        areInputsOkay={areInputsOkay}
        setIsOrdersLoading={setIsOrdersLoading}
      />
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

const Inputs = ({
  order,
  setOrder,
  setAreInputsOkay,
  areInputsOkay,
  setIsOrdersLoading,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsOrdersLoading(true);
      }}
    >
      <div id="input-container">
        <div className="form-group">
          <span>Priority</span>
          <input
            className={
              areInputsOkay.priority ? "form-field" : "form-field form-error"
            }
            id="priority-input"
            placeholder="1"
            type="number"
            onChange={(e) => {
              setOrder({ ...order, priority: e.target.value });
              if (!areInputsOkay.priority) {
                setAreInputsOkay({ ...areInputsOkay, priority: true });
              }
            }}
          />
        </div>
        <div className="form-group">
          <span>Name</span>
          <input
            className={
              areInputsOkay.name ? "form-field" : "form-field form-error"
            }
            id="name-input"
            type="text"
            placeholder="default name"
            onChange={(e) => {
              setOrder({ ...order, name: e.target.value });
              if (!areInputsOkay.name) {
                setAreInputsOkay({ ...areInputsOkay, name: true });
              }
            }}
          />
        </div>
        <div className="form-group">
          <span>DC</span>
          <input
            className={
              areInputsOkay.dc ? "form-field" : "form-field form-error"
            }
            id="dc-input"
            type="text"
            value={order.dc || ""}
            placeholder="Date Code"
            onChange={(e) => {
              setOrder({ ...order, dc: e.target.value });
              if (!areInputsOkay.dc) {
                setAreInputsOkay({ ...areInputsOkay, dc: true });
              }
            }}
          />
        </div>
        <div className="form-group">
          <span>PN</span>
          <input
            className={
              areInputsOkay.pn ? "form-field" : "form-field form-error"
            }
            id="pn-input"
            type="text"
            value={order.pn || ""}
            placeholder="Part Number"
            onChange={(e) => {
              setOrder({ ...order, pn: e.target.value });
              if (!areInputsOkay.pn) {
                setAreInputsOkay({ ...areInputsOkay, pn: true });
              }
            }}
          />
        </div>
        <div className="form-group">
          <span>SO</span>
          <input
            className={
              areInputsOkay.so ? "form-field" : "form-field form-error"
            }
            id="so-input"
            type="text"
            value={order.so || ""}
            placeholder="Sales Order"
            onChange={(e) => {
              setOrder({ ...order, so: e.target.value });
              if (!areInputsOkay.so) {
                setAreInputsOkay({ ...areInputsOkay, so: true });
              }
            }}
          />
        </div>
      </div>
      <button className="btn submit-btn" type="submit">
        SUBMIT
      </button>
    </form>
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
