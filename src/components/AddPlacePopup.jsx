import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";

function AddPlacePopup(props) {
  const inputPopupname = useRef();
  const inputPopuplink = useRef();

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
    inputPopupname.current.value = "";
    inputPopuplink.current.value = "";
    setSubmitButtonState(false);
    setFirstInputError("");
    setSecondInputError("");
    setSecondInputDirty(false);
    setFirstInputDirty(false);
  }

  useEffect(() => {
    clearForm();
  }, [props.isOpen]);

  function handleChangeName(e) {
    setFirstInputError(e.target.validationMessage);
    setFirstInputDirty(true);
  }

  function handleChangeLink(e) {
    setSecondInputError(e.target.validationMessage);
    setSecondInputDirty(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: inputPopupname.current.value,
      link: inputPopuplink.current.value,
    });
  }
  useEffect(() => {
    changeButtonState(firstInputError, firstInputDirty, secondInputDirty, secondInputError);

  }, [firstInputError, firstInputDirty, secondInputDirty, secondInputError]);
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
        uRef={inputPopupname}
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
        uRef={inputPopuplink}
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