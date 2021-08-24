import React, { useState, useEffect } from "react";

import { useGlobalContext } from "../context";
import { createOrder } from "../services/orders.db";
import { postParsedText } from "../services/get-text";
import { inputData } from "../data";
import OrderImage from "./OrderImage";

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

  const [imageBase64, setImageBase64] = useState("");
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  //TODO: handle if image is submitted before image exists
  const postData = async () => {
    const data = await postParsedText({ image: imageBase64 });
    setOrder({ ...order, ...data });
  };

  const handleSubmitJob = () => {
    closeModal();
  };

  const checkIfAllOkay = (curAreInputsOkay) => {
    return (
      curAreInputsOkay.so &&
      curAreInputsOkay.pn &&
      curAreInputsOkay.bin &&
      curAreInputsOkay.dc &&
      curAreInputsOkay.due &&
      curAreInputsOkay.customer
    );
  };

  const checkSubmitJob = () => {
    const curAreInputsOkay = areInputsOkay;
    if (!order.so) {
      curAreInputsOkay.so = false;
    }
    if (!order.pn) {
      curAreInputsOkay.pn = false;
    }
    if (!order.bin) {
      curAreInputsOkay.bin = false;
    }
    if (!order.dc) {
      curAreInputsOkay.dc = false;
    }
    if (!order.due) {
      curAreInputsOkay.due = false;
    }
    if (!order.customer) {
      curAreInputsOkay.customer = false;
    }
    setAreInputsOkay(curAreInputsOkay);
    return checkIfAllOkay(curAreInputsOkay);
  };

  //FIXME: there is a memory leak here if you refresh the page too fast
  //TODO: figure out what the fuck is going on here
  useEffect(() => {
    const abortController = new AbortController();
    if (isOrdersLoading) {
      const isSubmitOkay = checkSubmitJob();
      if (isSubmitOkay) {
        const fetchData = async () => {
          try {
            const curOrder = await createOrder(order);
            setJobs([...jobs, curOrder]);
          } catch (err) {}
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
      <div id="main-job-input-container">
        <OrderImage postData={postData} setImageBase64={setImageBase64} />
        <Inputs
          order={order}
          setOrder={setOrder}
          setAreInputsOkay={setAreInputsOkay}
          areInputsOkay={areInputsOkay}
          setIsOrdersLoading={setIsOrdersLoading}
        />
      </div>
    </>
  );
};

// const Title = () => {
//   return (
//     <div className="title" id="modal-title">
//       <h1>Add a New Job</h1>
//     </div>
//   );
// };
//TODO: date input should be templated
const Inputs = (props) => {
  const { setIsOrdersLoading } = props;

  return (
    <form
      id="job-input-container"
      onSubmit={(e) => {
        e.preventDefault();
        setIsOrdersLoading(true);
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
