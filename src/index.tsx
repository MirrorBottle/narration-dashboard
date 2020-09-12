import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, theme, CSSReset} from "@chakra-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/custom.scss";
import AdminLayout from './Layouts/Admin';
import AuthLayout from "./Layouts/Auth";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/admin/index" to="/admin/home" />
          <Redirect from="/" to="/admin/home" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
