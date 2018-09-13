import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Login from './login';
import Planets from './planets';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>           
            <Route path="/login" component={Login} />
            <Route path="/mainPage" component={Planets} />            
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
