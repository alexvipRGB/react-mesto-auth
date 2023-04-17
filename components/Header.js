import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <nav className="header__auth">
        <img className="logo" src={logo} alt="Логотип Mesto"/>
        <p className="header__text">{props.mail}</p>
        <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
      </nav>
    </header>
  )
}

export default Header;