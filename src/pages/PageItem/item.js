import React, { useEffect, useState } from "react";
import useFetch from "./../../hooks/useFetch";
import ItemBody from "./itemBody";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Item = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/contacts/${slug}`;
  const [
    {
      response: fetchItemResponse,
      error: errorFetchItem,
      isLoading: isLoadingItem,
    },
    doFetchItem,
  ] = useFetch(apiUrl);
  const [{ response: deleteItem }, doDelete] = useFetch(apiUrl);
  const [isDeleteOK, setIsdeleteOK] = useState(false);

  const deleteContact = () => {
    doDelete({
      method: "delete",
    });
  };
  useEffect(() => {
    doFetchItem();
  }, [doFetchItem]);

  useEffect(() => {
    if (!deleteItem) {
      return;
    }
    setIsdeleteOK(true);
  }, [deleteItem]);

  if (isDeleteOK) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          {!isLoadingItem && fetchItemResponse && (
            <ItemBody
              contact={fetchItemResponse}
              index={fetchItemResponse.id}
              key={fetchItemResponse.id}
            />
          )}
          {errorFetchItem && <div>Some error happend...</div>}
          <NavLink className="nav-link" to={`/contact/${slug}/edit`}>
            <button className="btn btn-lg pull-xs-right btn-primary">
              Редактировать
            </button>
          </NavLink>
          <button
            className="btn btn-lg pull-xs-right btn-outline-danger"
            onClick={deleteContact}
          >
            Удалить контакт
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
