import React, { useState, useContext } from "react";
import { jobsData } from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isJobInputModalOpen, setIsJobInputModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [isNavActive, setIsNavActive] = useState(true);
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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    turnOffAllModals();
  };

  const openJobInputModal = () => {
    setIsJobInputModalOpen(true);
    openModal();
  };
  const closeJobInputModal = () => {
    setIsJobInputModalOpen(false);
    closeModal();
  };

  const turnOffAllModals = () => {
    setIsJobInputModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        isJobInputModalOpen,
        setIsJobInputModalOpen,
        openJobInputModal,
        closeJobInputModal,
        isModalOpen,
        setIsModalOpen,
        openModal,
        closeModal,
        order,
        setOrder,
        isNavActive,
        setIsNavActive,
        areInputsOkay,
        setAreInputsOkay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
