import React from "react";
import Header from "../Components/Header";
import Pay from "../Components/Pay";

const PayPage = ({ title }) => {
  return (
    <>
      <Header title={title}></Header>
      <Pay />
    </>
  );
};

export default PayPage;
