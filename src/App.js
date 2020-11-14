// React and CSS Imports
import React from "react";
import "./App.scss";
import "./globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { Task } from "./app/components"

function App() {
  return (
    <div className="app flex-center fill-view">
      <Router>
        <Switch>
          <Route 
            exact path={"/"}
            component={Task}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
