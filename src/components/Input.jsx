function Input(props) {
  function checkInput(e) {
    props.checkBlur(e, props.dirty, props.error);
  }
  return (
    <>
      <input
        id={props.id}
        className={`popup__name ${props.class}`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required
        minLength={props.min}
        maxLength={props.max}
        value={props.params}
        onChange={props.handleChange}
        ref={props.uRef}
        onBlur={(event) => checkInput(event)}
      />

      <span className={`popup__name-error ${props.id}-error`}>
        {props.validationInput && props.validationError}
      </span>
    </>
  );
}

export default Input;