import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import useLocalStorage from "./../../hooks/useLocalStorage";
import { CurrentUserContext } from "./../../context/currentUser";
import BackendErrorMessages from "./../../components/backendMessages";

const AuthPage = (props) => {
  const isLogin = props.match.path === "/login";
  const pageTitle = isLogin ? "Sighn In" : "Sighn Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const apiUrl = isLogin ? "/auth/login" : "/auth/register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const [username, setUserNameField] = useState("");
  const [isSubmitOK, setisSubmitOK] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const [, setcurrentUserState] = useContext(CurrentUserContext);

  const onSubmitHandler = (event) => {
    const user = isLogin ? { email, password } : { email, password, username };
    event.preventDefault();
    console.log("email", email, "pass", password);
    doFetch({
      method: "post",
      data: user,
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setToken(response.access_token);
    console.log(localStorage);
    setisSubmitOK(true);

    setcurrentUserState((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response,
    }));
  }, [response, setToken, setcurrentUserState]);

  useEffect(() => {
    if (token) {
      setisSubmitOK(true);
    }
  }, [token]);

  if (isSubmitOK) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={"auth-page"}>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <div className="text-xs-center">
              <h1> {pageTitle}</h1>
              <p className="text-xs-center">
                <Link to={descriptionLink}>{descriptionText}</Link>
              </p>
              <form onSubmit={onSubmitHandler}>
                {error && <BackendErrorMessages backendError={error} />}
                <fieldset>
                  {!isLogin && (
                    <fieldset className="form-group">
                      <input
                        type="text"
                        placeholder={"UserName"}
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => {
                          setUserNameField(e.target.value);
                        }}
                      />
                    </fieldset>
                  )}

                  <fieldset className="form-group">
                    <input
                      type="email"
                      placeholder={"Email"}
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      placeholder={"Password"}
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type={"submit"}
                    disabled={isLoading}
                  >
                    {pageTitle}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
