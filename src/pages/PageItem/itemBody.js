import React from "react";
import { Link } from "react-router-dom";

const ItemBody = ({ index, contact }) => {
  return (
    <div key={index}>
      <div>
        <div className="subTitle"> Имя:</div>
        <Link className="preview-link" to={`/contacts/${contact.id}`}>
          <span style={{ float: "left" }}>
            <h1>{contact.name.toUpperCase()}</h1>
          </span>
          <h1>&nbsp;{contact.lastname.toUpperCase()}</h1>
        </Link>
        <div className="subTitle">Компания:</div> <h2> {contact.company}</h2>
      </div>
      <div className="subTitle">Эл. почта:</div>
      <div className="emailTitle">{contact.emailContact}</div>
      <span className="date">{contact.createdAt}</span>
      <hr />
    </div>
  );
};

export default ItemBody;
