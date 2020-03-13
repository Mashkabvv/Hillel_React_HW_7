import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

//components
import Tables from "./components/Tables/Tables";
import Waiters from "./components/Waiters/Waiters";
import Dishes from "./components/Dishes/Dishes";
import Checks from "./components/Checks/Checks";

function App() {
  return (
      <Router>
          <div className = 'header'>
              <Link className = 'link' to = '/tables'>Tables</Link>
              <Link className = 'link' to = '/waiters'>Waiters</Link>
              <Link className = 'link' to = '/dishes'>Dishes</Link>
              <Link className = 'link' to = '/checks'>Checks</Link>
          </div>
          <div className = 'content' >
              <Switch>
                  <Route path = '/tables'>
                      <Tables />
                  </Route>
                  <Route path = '/waiters'>
                      <Waiters />
                  </Route>
                  <Route path = '/dishes'>
                      <Dishes />
                  </Route>
                  <Route path = '/checks'>
                      <Checks />
                  </Route>
                  <Route path = '/*'>
                      <Redirect to = '/tables' />
                  </Route>
              </Switch>
          </div>
      </Router>
    
  );
}

export default App;
