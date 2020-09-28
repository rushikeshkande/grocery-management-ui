import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { store } from "./store/index";
import { Projects } from "@views/Home/Home";

export class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <section id="page-body">
            <Switch>
              <Route exact path="/" component={Projects} />
            </Switch>
          </section>
        </Router>
      </Provider>
    );
  }
}

export default App;
