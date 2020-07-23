import { Switch, Route } from "react-router-dom";
import GlobalFeed from "./globalFeed/index";
import React from "react";
import Auth from "./../pages/auth/index";
import CreateNewItem from "./PageItem/createNewItem";
import EditItem from "./PageItem/editItem";
import Item from "./PageItem/item";

export default () => {
  return (
    <Switch>
      <Route path={"/"} component={GlobalFeed} exact />
      <Route path={"/login"} component={Auth} />
      <Route path={"/register"} component={Auth} />
      <Route path={"/contacts/:slug"} component={Item} />
      <Route path={"/contact/new"} component={CreateNewItem} />
      <Route path={"/contact/:slug/edit"} component={EditItem} />
    </Switch>
  );
};
