import React, { useEffect, useState, useContext } from "react";
import useFetch from "./../../hooks/useFetch";
import MainPageItem from "./../mainPageItem";
import { CurrentUserContext } from "./../../context/currentUser";
import { Redirect } from "react-router-dom";
import Button from "./../PageItem/addButton";

const GlobalFeed = () => {
  const [searchUrlAdd, setSearchUrlAdd] = useState("");
  const apiUrl = `/contacts${searchUrlAdd}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [searchValue, setSearchValue] = useState("");
  const [currentUserState] = useContext(CurrentUserContext);
  const { isLoggedIn } = currentUserState;
  const [searchProgress, setSearchProgress] = useState(false);

  // filter
  const getSearchLast = (searchValue) => {
    return setSearchUrlAdd(`?lastname=${searchValue}`);
  };

  const onSubmit = () => {
    doFetch({
      method: "get",
    });
    setSearchProgress(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchLast(searchValue);
    onSubmit();
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className={"home-page"}>
      <div className="banner">
        <div className="container">
          <h1>My contacts</h1>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-10">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="search"
                    className="form-control form-control-lg"
                    placeholder={"Введите фамилию"}
                    value={searchValue}
                    onChange={(e) =>
                      setSearchValue(e.target.value.toLowerCase())
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type={"submit"}
                  >
                    Поиск
                  </button>
                </fieldset>
              </fieldset>
            </form>
            {searchProgress && response.length === 0 && <Button />}
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happend...</div>}
            {!isLoggedIn && <Redirect to={"/login"} />}
            {!isLoading && response && <MainPageItem contacts={response} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
