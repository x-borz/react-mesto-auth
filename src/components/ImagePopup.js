function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_image ${card? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container popup__container_content_image" onMouseDown={evt => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onMouseDown={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__img" src={card? card.link : '#'} alt={card? card.name : ''}/>
          <figcaption className="popup__caption">{card? card.name : ''}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
