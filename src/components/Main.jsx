import { useContext } from "react";

import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-outside">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Изменить аватар"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </button>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__submit-btn"
            aria-label="Изменить"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__paragrah">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          aria-label="Добавить"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;