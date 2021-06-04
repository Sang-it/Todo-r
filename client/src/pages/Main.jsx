import React from "react";
import { SidePanel } from "../components/SidePanel";
import { Today } from "../components/Today";
import { Calendar } from "../components/Calendar";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export const Main = ({ sideWidth, mainWidth, padding, forConditional }) => {
  return (
    <Router>
      <div className="main">
        <div className="right" style={{ width: `${sideWidth}` }}>
          <SidePanel />
        </div>
        <div
          className="left"
          style={{
            width: `${mainWidth}`,
            paddingLeft: `${padding}`,
          }}
        >
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/today">
              <Today forConditional={forConditional} />
            </Route>
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
