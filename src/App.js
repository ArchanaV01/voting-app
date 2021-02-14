import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root_body from "./components/Root_body";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Root_body} />
          <Route path="/Admin" component={AdminPage} user={""} />
          <Route path="/Home" component={UserPage} user={""} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
