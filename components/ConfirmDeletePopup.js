import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name={"popup__text_del"}
      title={"Вы уверены?"}
      button={"Да"}
      label={"Подтвердить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={true}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;