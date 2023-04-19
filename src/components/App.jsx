
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import auth from '../utils/auth';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoTooltip';
import resolve from "../images/resolve.png";
import reject from "../images/reject.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  const navigate = useNavigate();

  function handleRegister(email, password) {
    auth.registerUser(email, password)
      .then(() => {
        navigate("/sign-in")
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        handleInfoTooltip();
      })
      .catch((err) => {
        console.log(err);
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function handleLogin(email, password) {
    auth.loginUser(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setPopupImage(resolve);
          setEmail(email);
          navigate("/")
          setPopupTitle("Вы успешно авторизовались!");
          handleInfoTooltip();
        }
      })
      .catch((err) => {
        console.log(err);
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token")
    if (token) {
      auth.getToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  const blurHandler = (e, paramsDirty, paramsError) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "inputTitle":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
      case "inputUrl":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
      case "inputAvatarUrl":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
    }
  };
  /**
  * Получение информации о пользователе и исходных карточек при открытии страницы
  */
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((e) => console.log(e));
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setInfoTooltip(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
      })
      .catch((err) => console.log(err));
  }
  const handleDeleteCardSubmit = (card) => {
    api
      .removeCard(card._id)
      .then((res) => {
        const newCards = cards.filter((c) => (c._id === card._id ? "" : res));
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  };

  const handleCardDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setDeleteCard(card);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  };

  function clearValidationError(
    setFirstInputDirty,
    setFirstInputError,
    setSecondInputDirty,
    setSecondInputError
  ) {
    setFirstInputDirty(false);
    setFirstInputError("can't be blank");
    setSecondInputDirty(false);
    setSecondInputError("can't be blank");
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  };

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    infoTooltip;

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);
  
  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/sign-up"
              element={
                <>
                  <Header title='Войти' route="/sign-in" />
                  <Register onRegister={handleRegister} />
                </>
              }
            />
            <Route path="/sign-in"
              element={
                <>
                  <Header title='Регистрация' route="/sign-up" />
                  <Login onLogin={handleLogin} />
                </>
              }
            />
            <Route path="/" element={
              <>
                <Header
                  title='Выйти'
                  email={email}
                  onClick={handleSingOut}
                  route=""
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
                <Footer />
              </>
            }
            />
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            blurHandler={blurHandler}
            clearValidationError={clearValidationError}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            blurHandler={blurHandler}
            clearValidationError={clearValidationError}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            blurHandler={blurHandler}
            clearValidationError={clearValidationError}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleDeleteCardSubmit}
            card={deleteCard}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isOpen={isImagePopupOpen}
          />
          <InfoToolTip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip} 
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;