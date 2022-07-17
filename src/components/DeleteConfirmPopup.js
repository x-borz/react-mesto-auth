import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeleteConfirmPopup({isOpen, isLoading, onClose, onDeletePlace}) {
  const handleSubmit = evt => {
    evt.preventDefault();
    onDeletePlace();
  };

  return (
    <PopupWithForm title="Вы уверены?" buttonName="Да" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit}/>
  );
}

export default DeleteConfirmPopup;
