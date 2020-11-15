// React and CSS Imports
import React from "react";
import "./App.scss";
import "./globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Card } from "./app/containers";
import { HomePage } from "./app/views";


/*
function SampleCard() {
  return (
    <Card style={{ width: "60vw", color: "green"}}>
      <h1>
        This is a test!
      </h1>
      <h2>
        This is also a test?
      </h2>
      <h3>
        abcdefghijklmnop
      </h3>
      <h4>Featuring our friends:</h4>
      <p>
        Create React App
      </p>
      <p>
        SASS
      </p>
      <p>
        React Router
      </p>
    </Card>
  );
}
*/


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
            component={HomePage}
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
