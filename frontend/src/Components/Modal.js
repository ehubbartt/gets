import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";
import JobInputs from "./JobInputs";

/**
 * TODO:clear inputs on modal load
 * @returns
 */
const Modal = () => {
  const { isModalOpen, closeModal, isJobInputModalOpen } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <ModalContainer
        closeModal={closeModal}
        isJobInputModalOpen={isJobInputModalOpen}
      />
    </div>
  );
};

export const ModalContainer = ({ closeModal, isJobInputModalOpen }) => {
  return (
    <div className="modal-container">
      {isJobInputModalOpen ? <JobInputs /> : <div />}
      <button className="close-modal-btn" onClick={closeModal}>
        <FaTimes></FaTimes>
      </button>
    </div>
  );
};

export default Modal;
