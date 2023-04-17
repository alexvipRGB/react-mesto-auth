import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((like) => {
    return like._id === currentUser._id;
  });

  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"
    }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element">
      <li className="element__item">
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
      {isOwn && (
        <button
          className="element__trash"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__group">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-button">
            <button
              className={cardLikeButtonClassName}
              aria-label="Оценка"
              type="button"
              onClick={handleLikeClick}
            ></button>
            <span className="element__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;