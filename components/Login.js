import { useState } from "react";

function Login(props) {
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
    props.onLogin(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form-admin" onSubmit={handleSubmit}>
        <input className="auth__inputs" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
        <input className="auth__inputs" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;