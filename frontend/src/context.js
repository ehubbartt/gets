import React, { useState, useContext } from "react";
import { jobsData } from "./constants/data";

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
