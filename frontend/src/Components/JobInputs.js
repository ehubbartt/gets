import React, { useState } from "react";

import { useGlobalContext } from "../context";
import { createOrder } from "../services/orders.db";
import { postParsedText } from "../services/get-text";
import { inputData } from "../constants/data";
import OrderImage from "./OrderImage";
import { checkIfAllOkay, checkSubmitJob } from "../functions/check-submits";

/**
 * @returns job inputs to be placed inside the modal
 */
const JobInputs = () => {
  const { jobs, setJobs, closeModal } = useGlobalContext();
  const [order, setOrder] = useState({
    so: null,
    pn: null,
    bin: null,
    dc: null,
    due: null,
    customer: null,
    note: null,
  });
  const [areInputsOkay, setAreInputsOkay] = useState({
    so: true,
    pn: true,
    bin: true,
    dc: true,
    due: true,
    customer: true,
    note: true,
  });

  const [imageBase64, setImageBase64] = useState();
  const [isCheckingInputs, setIsCheckingInputs] = useState(false);

  const postData = async () => {
    if (!imageBase64) {
      console.error("image does not exist");
      return;
    }
    const data = await postParsedText({ image: imageBase64 });
    setOrder({ ...order, ...data });
  };

  const handleSubmitJob = () => {
    closeModal();
  };

  const handleSubmit = (isSubmitOkay) => {
    const abortController = new AbortController();
    if (isSubmitOkay) {
      fetchData();
      handleSubmitJob();
    }
    return () => {
      abortController.abort();
    };
  };

  const fetchData = async () => {
    try {
      const curOrder = await createOrder(order);
      setJobs([...jobs, curOrder]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="main-job-input-container">
        <OrderImage postData={postData} setImageBase64={setImageBase64} />
        <Inputs
          order={order}
          setOrder={setOrder}
          setAreInputsOkay={setAreInputsOkay}
          areInputsOkay={areInputsOkay}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

//TODO: date input should be templated
const Inputs = (props) => {
  const { handleSubmit, areInputsOkay, order, setAreInputsOkay } = props;

  return (
    <form
      id="job-input-container"
      onSubmit={(e) => {
        e.preventDefault();
        const curAreInputsOkay = checkSubmitJob(areInputsOkay, order);
        setAreInputsOkay({ ...areInputsOkay });
        const isSubmitOkay = checkIfAllOkay(curAreInputsOkay);
        handleSubmit(isSubmitOkay);
      }}
    >
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
      <button className="btn submit-btn" type="submit">
        Submit Order
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
          //if input is blank outlined in red
          areInputsOkay[`${lowerName}`] ? "form-field" : "form-field form-error"
        }
        id={`${lowerName}-input`}
        placeholder={ph}
        value={order[`${lowerName}`] || ""}
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

export default JobInputs;
