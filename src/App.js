// React and CSS Imports
import React from "react";
import "./App.scss";
import "./globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Card } from "./app/containers";

function SampleCard() {
  return (
    <Card style={{ width: "30vw"}, { height: "50vw"}}>
      <h1>
        Add To-Do List Task:
      </h1>
      <h4>Name of Task:</h4>
      <p>
        {/* <input type="button" value="OK">
        <input type="text"> */}
      </p>
      <p>
        React Router
      </p>
    </Card>
  );
}

function OtherCard() {
  return (
    <Card style={{ width: "30vw"}}>
      <h1>
        Other Page!
      </h1>
      <p>
        Howdy
      </p>
    </Card>
  );
}

function App() {
  return (
    <div className="app flex-center fill-view">
      <Router>
        <Switch>
          <Route 
            exact path={"/"}
            component={SampleCard}
          />
          <Route 
            exact path={"/other"}
            component={OtherCard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
