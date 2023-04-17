function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name}_popup ${props.isOpen ? "popup_opened" : ""
        }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={() => {
            if (props.clearErrors) {
              props.clearErrors();
              props.onClose();
              props.clearForm();
            }
            if (props.clearForm) {
              props.onClose();
              props.clearForm();
            } else {
              props.onClose();
            }
          }}
        ></button>
        <h2 className="popup__text">{props.title}</h2>
        <form className="popup__form" name={props.name}
          onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button
          className={
              props.buttonState
                ? "popup__save"
                : "popup__save popup__save_invalid"
            }
            type="submit"
            name="submit"
            aria-label={props.label}
            disabled={!props.buttonState}
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;