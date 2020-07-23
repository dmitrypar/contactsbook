import React from "react";
import ItemBody from "./PageItem/itemBody";

const MainPageItem = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <ItemBody contact={contact} index={index} key={index} />
      ))}
    </div>
  );
};
export default MainPageItem;
