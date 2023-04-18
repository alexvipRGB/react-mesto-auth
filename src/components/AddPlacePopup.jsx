import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [firstInputDirty, setFirstInputDirty] = useState(false);
  const [firstInputError, setFirstInputError] = useState("can't be blank");
  const [secondInputDirty, setSecondInputDirty] = useState(false);
  const [secondInputError, setSecondInputError] = useState("can't be blank");
  const [submitButtonState, setSubmitButtonState] = useState(false);

  function changeButtonState() {
    if (firstInputError || secondInputError) {
      setSubmitButtonState(false);
    } else {
      setSubmitButtonState(true);
    }
  }

 useEffect(() => {
    changeButtonState();
  }, [firstInputError, secondInputError]);

  function clearForm() {
    setName("");
    setLink("");
  }

 useEffect(() => {
    setSubmitButtonState(false);

    props.clearValidationError(
      setFirstInputDirty,
      setFirstInputError,
      setSecondInputDirty,
      setSecondInputError
    );
    clearForm();

  }, [props.isOpen, firstInputDirty, firstInputError, secondInputDirty,secondInputError]);

  function handleChangeName(e) {
    setName(e.target.value);
    setFirstInputError(e.target.validationMessage);
    setFirstInputDirty(true);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    setSecondInputError(e.target.validationMessage);
    setSecondInputDirty(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    }); 
  }

  return (
    <PopupWithForm
      name={"popupNewMesto"}
      title={"Новое место"}
      button={"Создать"}
      label={"Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={submitButtonState}
      clearForm={clearForm}
    >
      <Input
        id={"nameNewMesto"}
        class={"popup__name_text"}
        type={"text"}
        name={"nameNewMesto"}
        placeholder={"Название"}
        min={"2"}
        max={"200"}
        params={name}
        handleChange={handleChangeName}
        validationInput={firstInputDirty}
        validationError={firstInputError}
        checkBlur={props.blurHandler}
        dirty={setFirstInputDirty}
        error={setFirstInputError}
      />
      <Input
        id={"linkNewMesto"}
        class={"popup__name_img"}
        type={"url"}
        name={"linkNewMesto"}
        placeholder={"Ссылка на картинку"}
        params={link}
        handleChange={handleChangeLink}
        validationInput={secondInputDirty}
        validationError={secondInputError}
        checkBlur={props.blurHandler}
        dirty={setSecondInputDirty}
        error={setSecondInputError}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;