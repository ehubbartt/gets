import React, { useState, useEffect } from "react";
import { postParsedText } from "../services/get-text";
import { useGlobalContext } from "../context";
import { createOrder } from "../services/orders.db";
import CircularProgress from "@material-ui/core/CircularProgress";
import { inputData } from "../data";
import { getDate } from "../functions/getDate";

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
    const today = getDate();
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

  const handleSubmitJob = () => {
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

const Inputs = (props) => {
  const { setIsOrdersLoading } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsOrdersLoading(true);
      }}
    >
      <div id="input-container">
        {inputData.map((data, idx) => {
          return (
            <Input
              key={idx}
              {...props}
              name={data.name}
              type={data.type}
              ph={data.ph}
            ></Input>
          );
        })}
      </div>
      <button className="btn submit-btn" type="submit">
        SUBMIT
      </button>
    </form>
  );
};

const Input = ({
  name,
  type,
  areInputsOkay,
  setAreInputsOkay,
  order,
  setOrder,
  ph,
}) => {
  const lowerName = name.toLowerCase();
  return (
    <div className="form-group">
      <span>{name}</span>
      <input
        className={
          areInputsOkay[`${lowerName}`] ? "form-field" : "form-field form-error"
        }
        id={`${lowerName}-input`}
        placeholder={ph}
        type={type}
        onChange={(e) => {
          setOrder({ ...order, [`${lowerName}`]: e.target.value });
          if (!areInputsOkay[`${lowerName}`]) {
            setAreInputsOkay({ ...areInputsOkay, [`${lowerName}`]: true });
          }
        }}
      />
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
