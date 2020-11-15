// React and CSS Imports
import React from "react";
import "./App.scss";
import "./globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Card } from "./app/containers";
import { HomePage } from "./app/views";


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
    <div className="app flex-col fill-view">
      <Router>
        <Switch>
          <Route 
            exact path={"/"}
            component={HomePage}
          />
          <Route 
            exact path={"/about"}
            component={OtherCard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
