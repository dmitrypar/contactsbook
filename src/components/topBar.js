import React, { useContext, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrentUserContext } from "./../context/currentUser";

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <nav className={"navbar navbar-light"}>
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Contactsbook
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" >
              Главная
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Войти
                </Link>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Регистрация
                </NavLink>
              </li>
            </Fragment>
          )}
          {currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/contact/new" className="nav-link">
                  &nbsp; Новый контакт
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
