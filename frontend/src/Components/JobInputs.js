import React, { useState } from "react";

import { useGlobalContext } from "../context";
import { createOrder } from "../services/orders.db";
import { postParsedText } from "../services/get-text";
import { inputData } from "../constants/data";
import OrderImage from "./OrderImage";
import { checkIfAllOkay, checkSubmitJob } from "../functions/check-submits";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import format from "date-fns/format";
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
    due: format(new Date(), "P"),
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
  const [date, setDate] = useState(new Date());

  const postData = async () => {
    if (!imageBase64) {
      console.error("image does not exist");
      return;
    }
    const data = await postParsedText({ image: imageBase64 });
    setOrder({ ...order, ...data });
  };

  const handleSubmitJob = () => {
    setOrder({});
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
          date={date}
          setDate={setDate}
        />
      </div>
    </>
  );
};

const Inputs = (props) => {
  const {
    handleSubmit,
    areInputsOkay,
    order,
    setAreInputsOkay,
    date,
    setOrder,
  } = props;

  return (
    <form
      id="job-input-container"
      onSubmit={(e) => {
        e.preventDefault();
        setOrder({ ...order, due: format(date, "P") });
        const curAreInputsOkay = checkSubmitJob(areInputsOkay, order, date);
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
            isDate={data.isDate}
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
  isDate,
  date,
  setDate,
}) => {
  const lowerName = name.toLowerCase();
  return (
    <div className="form-group">
      <span>{name}</span>
      {!isDate ? (
        <input
          className={
            //if input is blank outlined in red
            areInputsOkay[`${lowerName}`]
              ? "form-field"
              : "form-field form-error"
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
      ) : (
        <DatePicker
          minDate={new Date()}
          required={true}
          value={date}
          onChange={setDate}
        />
      )}
    </div>
  );
};

export default JobInputs;
