import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/Auth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import FindPassword from "../pages/find/Find";
import NewPassword from "../pages/new/NewPassword";
import Error from "../pages/error/Error";

function UnFrameRoutes() {
  return (
    <Switch>
      {/* <Route exact path="/login" component={Auth(Login, false)} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Auth(Register, false)} />
      <Route exact path="/find" component={Auth(FindPassword, false)} />
      <Route exact path="/password" component={Auth(NewPassword, false)} />
      <Route exact path="/error" component={Error} />
    </Switch>
  );
}

export default UnFrameRoutes;
