import React from "react";
import Header from "../Components/Header";
import Joblist from "../Components/Joblist";
import Modal from "../Components/Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import JobInputs from "../Components/JobInputs";
import { useGlobalContext } from "../context";

const JobPage = ({ title }) => {
  const { openModal } = useGlobalContext();

  return (
    <>
      <Header title={title}></Header>
      <Joblist></Joblist>
      <Modal>
        <JobInputs />
      </Modal>
      <Fab aria-label="add" id="add-fab" onClick={openModal}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default JobPage;
