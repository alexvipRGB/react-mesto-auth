import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";

function EditAvatarPopup(props) {
  const inputAvatar = useRef();

  const [firstInputDirty, setFirstInputDirty] = useState(false);
  const [firstInputError, setFirstInputError] = useState("can't be blank");
  const [submitButtonState, setSubmitButtonState] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }

  function handleChangeAvatar(e) {
    setFirstInputError(e.target.validationMessage);
    setFirstInputDirty(true);
  }

  function clearForm() {
    inputAvatar.current.value = "";
    setSubmitButtonState(false);
    setFirstInputError("");
    setFirstInputDirty(false);
  }

  function changeButtonState(firstInputError, firstInputDirty) {
    if (firstInputError || !firstInputDirty) {
      setSubmitButtonState(false);
    } else {
      setSubmitButtonState(true);
    }
  }

  useEffect(() => {
    clearForm();
  }, [props.isOpen]);

  useEffect(() => {
    changeButtonState(firstInputError, firstInputDirty);

  }, [firstInputError, firstInputDirty]);

  return (
    <PopupWithForm
      name={"popupAvatar"}
      title={"Обновить аватар"}
      button={"Сохранить"}
      label={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={submitButtonState}
      clearForm={clearForm}
    >
      <Input
        id={"avatar-url"}
        class={"popup__name_avatar"}
        type={"url"}
        name={"inputAvatarUrl"}
        placeholder={"Ссылка на картинку"}
        uRef={inputAvatar}
        validationInput={firstInputDirty}
        validationError={firstInputError}
        checkBlur={props.blurHandler}
        dirty={setFirstInputDirty}
        error={setFirstInputError}
        handleChange={handleChangeAvatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;