import React, { useState, useContext } from "react";
import { jobsData } from "./constants/data";
import { removeOrder } from "./services/orders.db";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [isNavActive, setIsNavActive] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const removeJob = (id) => {
    console.log(id);
    setJobs(jobs.filter((job) => job.id !== id));
    removeOrder(id);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        isModalOpen,
        setIsModalOpen,
        closeModal,
        openModal,
        isNavActive,
        setIsNavActive,
        removeJob,
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
