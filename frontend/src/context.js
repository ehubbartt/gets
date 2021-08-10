import React, { useState, useContext } from "react";
import { jobsData } from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isJobInputModalOpen, setIsJobInputModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [order, setOrder] = useState({
    priority: null,
    name: null,
    datecode: null,
    pn: null,
    so: null,
    date: null,
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
