import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import resolve from "../images/resolve.png";
import reject from "../images/reject.png";

function App() {
  const navigate = useNavigate()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [deleteCard, setDeleteCard] = useState({})
  // Авторизация пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [emailName, setEmailName] = useState(null)
  const [infoTooltip, setInfoTooltip] = useState(false)
  const [popupImage, setPopupImage] = useState("")
  const [popupTitle, setPopupTitle] = useState("")


  function onRegister(email, password) {
    auth.registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip)
  }

  function onLogin(email, password) {
    auth.loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  /**
  * Получение информации о пользователе и исходных карточек при открытии страницы
  */

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

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setInfoTooltip(false);
  };

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

    if ((isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || infoTooltip) === true) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscClose);
    }

  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen, infoTooltip]);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            } />

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            } />

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardDelete={handleCardDeleteClick}
                  onCardLike={handleCardLike}
                />
                <Footer />
              </>
            } />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
            blurHandler={blurHandler}
            clearValidationError={clearValidationError}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            blurHandler={blurHandler}
            clearValidationError={clearValidationError}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateAvatar}
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
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;