function ImagePopup(props) {
  return (
    <div className={`popup popup-img popup_img ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_image">
        <form name="popupFormOpenCard" id="popupFormOpenCard" className="popup__form popup__form_PopupOpenCard">
          <button
            aria-label="Закрыть"
            className="popup__close icons"
            type="button"
            onClick={props.onClose}
          ></button>
          <figure className="popup__element-image">
            <img className="popup__image" src={props.card.link} alt={props.card.name}/>
            <figcaption className="popup__title-Img">
              <h2 className="popup__name-image">{props.card.name}</h2>
            </figcaption>
          </figure>
        </form>
      </div>
    </div>
  );
}

export default ImagePopup;