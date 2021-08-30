import React from "react";
import Header from "../Components/Header";
import Pay from "../Components/Pay";
import "../styles/pay.css";

const PayPage = ({ title }) => {
  return (
    <>
      <Header title={title}></Header>
      <Pay />
    </>
  );
};

export default PayPage;
