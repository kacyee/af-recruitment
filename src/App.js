import React from "react";
import "./App.css";
import Form from "./components/Form.js";
import User from "./components/User.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Form />
            </Route>
            <Route path="/user/:userId" component={User} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
