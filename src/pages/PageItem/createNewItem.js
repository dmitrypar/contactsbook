import React, { useState, useEffect } from "react";
import ItemForm from "./itemForm";
import useFetch from "./../../hooks/useFetch";
import { Redirect } from "react-router-dom";

const CreateNewItem = () => {
  const apiUrl = "/contacts";
  const [{ response, errors }, doFetch] = useFetch(apiUrl);
  const [isSubmitOK, setSubmitOK] = useState(false);

  const onSubmit = (contact) => {
    console.log("onSubmit", contact);
    doFetch({
      method: "post",
      data: contact,
    });
  };
  const initialValues = {
    name: "",
    lastname: "",
    company: "",
    emailContact: "",
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setSubmitOK(true);
  }, [response]);

  if (isSubmitOK) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <ItemForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={errors}
      />
    </div>
  );
};

export default CreateNewItem;
