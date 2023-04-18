import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Mesto" />
      <div className="header__auth">
        <p className="header__text">{props.email}</p>
        <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
      </div>
    </header>
  )
}

export default Header;