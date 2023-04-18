import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [prevName, setPrevName] = useState("");
  const [prevDescription, setPrevDescription] = useState("");

  const [firstInputDirty, setFirstInputDirty] = useState(true);
  const [firstInputError, setFirstInputError] = useState("");
  const [secondInputDirty, setSecondInputDirty] = useState(true);
  const [secondInputError, setSecondInputError] = useState("");
  const [submitButtonState, setSubmitButtonState] = useState(true);

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

  useEffect(() => {
    setPrevName(name);
    setPrevDescription(description);
    setSubmitButtonState(true);
    setFirstInputError("");
    setSecondInputError("");
  }, [props.isOpen]);

  function clearForm() {
    setName(prevName);
    setDescription(prevDescription);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    setFirstInputError(e.target.validationMessage);
    setFirstInputDirty(true);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setSecondInputError(e.target.validationMessage);
    setSecondInputDirty(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"popupProfile"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      label={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={submitButtonState}
      clearForm={clearForm}
    >
      <Input
        id={"nameInput"}
        class={"popup__name_profile"}
        type={"text"}
        name={"nameInput"}
        placeholder={"Ваше имя"}
        min={"2"}
        max={"40"}
        params={name || ""}
        handleChange={handleChangeName}
        validationInput={firstInputDirty}
        validationError={firstInputError}
        checkBlur={props.blurHandler}
        dirty={setFirstInputDirty}
        error={setFirstInputError}
      />
      <Input
        id={"jobInput"}
        class={"popup__name_job"}
        type={"text"}
        name={"jobInput"}
        placeholder={"Род деятельности"}
        min={"2"}
        max={"200"}
        params={description || ""}
        handleChange={handleChangeDescription}
        validationInput={secondInputDirty}
        validationError={secondInputError}
        checkBlur={props.blurHandler}
        dirty={setSecondInputDirty}
        error={setSecondInputError}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
