import React from "react";
import { Switch } from "react-router";

import SignIn from './Pages/SignIn'
import Home from "./Pages/Home";
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from './components/PublicRoute'
import "./styles/main.scss";
//import 'rsuite/dist/rsuite.min.css';
import 'rsuite/dist/styles/rsuite-default.css';

const App = () => {
  return (
    <Switch>
      <PublicRoute path='/signin'>
        <SignIn></SignIn>
      </PublicRoute>
      <PrivateRoute path='/'>
        <Home></Home>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
