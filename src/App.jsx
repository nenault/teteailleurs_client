import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import Sentences from "./pages/Sentences";
import OneSentence from "./pages/OneSentence";

import Words from "./pages/Words";
import OneWord from "./pages/OneWord";
import CreateWord from "./pages/CreateWord";
import EditWord from "./pages/EditWord";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/sentences" component={Sentences} />
        <Route exact path="/sentences/:id" component={OneSentence} />

        <Route exact path="/words" component={Words} />
        <Route exact path="/words/:id" component={OneWord} />
        <Route exact path="/words/create" component={CreateWord} />
        <Route exact path="/words/:id/edit" component={EditWord} />

        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
