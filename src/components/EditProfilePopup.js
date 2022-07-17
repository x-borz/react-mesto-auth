import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleChange = evt => {
    const setter = evt.target.id === 'profile-name'? setName : setDescription;
    setter(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser({name, about: description});
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm title="Редактировать профиль" buttonName="Сохранить" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit}>
      <input id="profile-name" className="popup__input popup__input_el_profile-name" type="text" placeholder="Имя" required minLength="2" maxLength="40" name="name" onChange={handleChange} value={name || ''}/>
      <span className="profile-name-error popup__error"></span>
      <input id="profile-job" className="popup__input popup__input_el_profile-job" type="text" placeholder="О себе" required minLength="2" maxLength="200" name="job" onChange={handleChange} value={description || ''}/>
      <span className="profile-job-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
