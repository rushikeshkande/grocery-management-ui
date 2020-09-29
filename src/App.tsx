import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { store } from "./store/index";
import { Projects } from "@views/Home/Home";
import { Login } from "@views/Login/Login";

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <section id="page-body">
            <Switch>
              <Route exact path="/" component={Projects} />
              <Route path="/login" component={Login} />
            </Switch>
          </section>
        </Router>
      </Provider>
    );
  }
}

export default App;
