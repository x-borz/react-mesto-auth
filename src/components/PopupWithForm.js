import React from "react";
import FormValidator from "../utils/FormValidator";
import {validParams} from "../utils/utils";

function PopupWithForm({name, title, isOpen, isLoading, buttonName, onClose, onSubmit, children}) {
  const form = React.createRef()
  const [validator, setValidator] = React.useState(null);

  React.useEffect(() => {
    const validator = new FormValidator(validParams, form.current)
    validator.enableValidation();
    setValidator(validator);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      validator.resetValidation();
    }
  }, [isOpen]);

  return (
    <section className={`popup popup_type_common ${isOpen? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container popup__container_content_common" onMouseDown={evt => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onMouseDown={onClose}></button>
        <h2 className={`popup__heading ${name === 'confirmation'? 'popup__heading_type_confirmation' : ''}`}>{title}</h2>
        <form className="popup__form popup__form_type_profile" onSubmit={onSubmit} noValidate ref={form}>
          {children}
          <button className="popup__submit-button" type="submit">{isLoading? 'Сохранение...' : buttonName}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
