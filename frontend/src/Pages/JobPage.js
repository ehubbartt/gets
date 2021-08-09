import React from "react";
import Header from "../Components/Header";
import Joblist from "../Components/Joblist";
import Modal from "../Components/Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useGlobalContext } from "../context";

const JobPage = ({ title }) => {
  const { openJobInputModal } = useGlobalContext();
  return (
    <>
      <Header title={title}></Header>
      <Joblist></Joblist>
      <Modal />
      <Fab aria-label="add" id="add-fab" onClick={openJobInputModal}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default JobPage;
