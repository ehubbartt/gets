import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";

/**
 * @returns a modal on the screen
 */
const Modal = ({ children }) => {
  const { isModalOpen, closeModal } = useGlobalContext();

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <ModalContainer
        closeModal={closeModal}
        children={children}
      ></ModalContainer>
    </div>
  );
};

/**
 * @returns the modal container and placed the appropriate component in the modal container
 * based on the state of the components
 */
export const ModalContainer = ({ closeModal, children }) => {
  return (
    <div className="modal-container">
      {children}
      <button className="close-modal-btn" onClick={closeModal}>
        <FaTimes></FaTimes>
      </button>
    </div>
  );
};

export default Modal;
