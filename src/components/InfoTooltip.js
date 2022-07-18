import React from "react";

function InfoTooltip({isRegistrationSuccessful, isOpened, onClose}) {
  return (
    <section className={`popup popup_type_common ${isOpened? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container popup__container_content_common" onMouseDown={evt => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onMouseDown={onClose}></button>
        <div className={`popup__icon ${isRegistrationSuccessful? "popup__icon_status_ok" : "popup__icon_status_fail"}`}/>
        <h2 className="popup__message">{isRegistrationSuccessful? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
