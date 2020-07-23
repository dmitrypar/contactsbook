import React, { useState, useEffect } from "react";
import BackendErrorMessages from "./../../components/backendMessages";

const ItemForm = ({ onSubmit, errors, initialValues }) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [emailContact, setEmailContact] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = {
      name,
      lastname,
      company,
      emailContact,
    };
    onSubmit(contact);
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }
    console.log(initialValues);
    setName(initialValues.name);
    setLastName(initialValues.lastname);
    setCompany(initialValues.company);
    setEmailContact(initialValues.emailContact);
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendError={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={"Имя контакта"}
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={"Фамилия контакта"}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value.toLowerCase())}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={"Название компании"}
                    value={company}
                    onChange={(e) => setCompany(e.target.value.toLowerCase())}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={"Контактный эл. адрес"}
                    value={emailContact}
                    onChange={(e) =>
                      setEmailContact(e.target.value.toLowerCase())
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type={"submit"}
                  >
                    Добавить
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
