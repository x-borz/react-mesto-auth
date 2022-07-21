import React from "react";

function InfoTooltip({isSuccessful, isOpened, onClose}) {
  React.useEffect(() => {
    const handleEscClose = evt => {
      if (evt.key === 'Escape') onClose();
    }
    if (isOpened) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpened]);

  return (
    <section className={`popup popup_type_common ${isOpened? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container popup__container_content_common" onMouseDown={evt => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onMouseDown={onClose}></button>
        <div className={`popup__icon ${isSuccessful? "popup__icon_status_ok" : "popup__icon_status_fail"}`}/>
        <h2 className="popup__message">{isSuccessful? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
