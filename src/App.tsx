import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import { Home } from "@views/Home/Home";
import { Login } from "@views/Login/Login";
import { Signup } from "@views/Signup/Signup";
import {Header} from "@components/Header/Header";
import { Layout } from "antd";
import FooterComponent from "@components/Footer/Footer";
import { connect } from "react-redux";
import { ForgotPassword } from "@views/Forgot/ForgotPassword";
import {ProductDetails} from "@views/ProductDetails/ProductDetails";
import {Cart} from "@views/Cart/Cart";
import {Profile} from "@views/Profile/Profile";
import {Orders} from "@views/Orders/Orders";


class PrivateRoutes extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const { Component, isLoggedIn, path, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <div>
              <Header />
              <Component {...this.props} />
              <FooterComponent />
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}
export class App extends React.PureComponent<any, any> {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot" component={ForgotPassword} />
            <PrivateRoutes
              exact
              path="/products"
              isLoggedIn={isLoggedIn}
              Component={Home}
            />
            <PrivateRoutes
            exact
            path="/product-details/:id"
            isLoggedIn={isLoggedIn}
            Component={ProductDetails}
            />
            <PrivateRoutes
            exact
            path="/cart"
            isLoggedIn={isLoggedIn}
            Component={Cart}
            />
            <PrivateRoutes
            exact
            path="/profile"
            isLoggedIn={isLoggedIn}
            Component={Profile}
            />
            <PrivateRoutes
            exact
            path="/orders"
            isLoggedIn={isLoggedIn}
            Component={Orders}
            />
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoggedIn = localStorage.getItem("authorization") || null;
  return {
    isLoggedIn,
  };
};

// tslint:disable-next-line:variable-name
const Routes = connect(mapStateToProps)(App);

export default Routes;
