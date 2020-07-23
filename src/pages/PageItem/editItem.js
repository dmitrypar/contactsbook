import React, { useEffect, useState } from "react";
import ItemForm from "./itemForm";
import useFetch from "./../../hooks/useFetch";
import { Redirect } from "react-router-dom";

const EditItem = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/contacts/${slug}`;
  const [{ response: fetchContactRespose }, doFetchContact] = useFetch(apiUrl);
  const [
    { response: updateContactRespose, errors },
    doUpdateContact,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSubmitOK, setisSubmitOK] = useState(false);
  useEffect(() => {
    doFetchContact();
  }, [doFetchContact]);

  const onSubmit = (contact) => {
    console.log("onSubmitEdit contact", contact);
    doUpdateContact({
      method: "put",
      data: contact,
    });
  };

  useEffect(() => {
    if (!updateContactRespose) {
      return;
    }
    setisSubmitOK(true);
  }, [updateContactRespose]);

  useEffect(() => {
    if (!fetchContactRespose) {
      return;
    }
    setInitialValues({
      name: fetchContactRespose.name,
      lastname: fetchContactRespose.lastname,
      company: fetchContactRespose.company,
      emailContact: fetchContactRespose.emailContact,
    });
  }, [fetchContactRespose]);

  if (isSubmitOK) {
    return <Redirect to={`/`} />;
  }

  return (
    <ItemForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      errors={errors}
    />
  );
};

export default EditItem;
