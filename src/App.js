// React and CSS Imports
import React from "react";
import "./App.scss";
import "./globals/hack-styles.scss";

// Installed dependency imports
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Website imports for classes you made
import { HomePage } from "./app/views";
import { AboutPage } from "./app/views";
import { RecommendPage } from "./app/views";


function App() {
  return (
    <div className="app flex-col">
      <Router>
        <Switch>
          <Route 
            exact path={"/"}
            component={HomePage}
          />
          <Route 
            exact path={"/about"}
            component={AboutPage}
          />
          <Route 
            exact path={"/recommend"}
            component={RecommendPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
