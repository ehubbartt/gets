import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";
import JobInputs from "./JobInputs";

/**
 * @returns a modal on the screen
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

/**
 * @returns the modal container and placed the appropriate component in the modal container
 * based on the state of the components
 */
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
