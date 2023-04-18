import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form-admin" onSubmit={handleSubmit}>
        <input className="auth__inputs" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
        <input className="auth__inputs" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link> </p>
    </section>
  );
}

export default Register;