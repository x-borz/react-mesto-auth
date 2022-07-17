import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api";

function Cards({currentUser, setCurrentUser}) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardDeleteClick = card => setCardForDelete(card);

  const handleCardClick = card => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null)
  }

  const handleUpdateUser = body => {
    setIsLoading(true);
    api.updateUserInfo(body)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = link => {
    setIsLoading(true);
    api.updateAvatar(link)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleCardLike = card => {
    const isCardLiked = card.likes.some(item => currentUser._id === item._id);
    api.setLikeStatus(card._id, !isCardLiked)
      .then(newCard => setCards(prevCards => prevCards.map(c => c._id === card._id? newCard : c)))
      .catch(err => console.log(err));
  }

  const handleCardDelete = () => {
    setIsLoading(true);
    api.dropCard(cardForDelete._id)
      .then(() => {
        setCards(prevCards => prevCards.filter(c => cardForDelete._id !== c._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlace = body => {
    setIsLoading(true);
    api.addCard(body)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || cardForDelete;

  React.useEffect(() => {
    const handleEscClose = evt => {
      if (evt.key === 'Escape') closeAllPopups();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(initCards => setCards(initCards))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDeleteClick={handleCardDeleteClick}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <DeleteConfirmPopup
        isOpen={!!cardForDelete}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onDeletePlace={handleCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default Cards;
