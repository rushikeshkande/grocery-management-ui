import * as React from "react";
import "./styles/LoginForm.style.scss";
import grocery from "@assets/images/grocery.jpg";
import { withRouter } from "react-router-dom";
import { loginUser } from "@services/promises/loginService";
import { saveToken } from "@services/service";
import { notification } from "antd";
import { fetchCartCount, saveUserData } from "@actions/index";
import { connect } from "react-redux";

export interface ILoginFormState {
  username: string;
  password: string;
  isLoading: boolean;
}
export interface ILoginFormProps {}

export class LoginFormComponent extends React.PureComponent<
  any,
  ILoginFormState
> {
  state = {
    username: "",
    password: "",
    isLoading: false,
  };

  gotoSignup = () => {
    this.props.history.push("/signup");
  };

  gotoForgot = () => {
    this.props.history.push("/forgot");
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLoginUser = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const payload = {
      email: this.state.username,
      password: this.state.password,
    };
    loginUser(payload)
      .then((result: any) => {
        fetchCartCount(result.data.user._id);
        saveToken(result.data.token);
        saveUserData(result.data.user);
        this.props.history.push("/products", () => {
          notification.success({
            message: "Login Success",
            description: "You have logged in successfully...",
          });
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        notification.error({
          message: "Login Error",
          description: "Invalid Credentials",
        });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <section className="container login-form">
        {isLoading && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="loader"
          />
        )}
        <div className="col-12 d-flex login-form-wrapper">
          <div className="form-section col-8">
            <div className="sign-in-header">
              <strong className="sign">Sign </strong>
              <strong className="in">In</strong>
            </div>
            <form onSubmit={this.handleLoginUser}>
              <div className="login-input-wrapper">
                <input
                  placeholder="Username or Email"
                  className="login-input"
                  type="text"
                  required
                  onChange={this.handleUsername}
                ></input>
              </div>
              <div className="login-input-wrapper">
                <input
                  placeholder="Password"
                  className="login-input"
                  type="password"
                  required
                  onChange={this.handlePassword}
                ></input>
              </div>
              <div className="forgot-password-checkbox-wrapper">
                <div>
                  <p onClick={this.gotoForgot}>Forgot Password?</p>
                </div>
              </div>
              <div className="login-input-wrapper">
                <button type="submit" className="submit-btn">
                  SIGN IN
                </button>
              </div>
            </form>
            <div className="signup-link-wrapper">
              <p>Not a member?</p>
              <p onClick={this.gotoSignup} className="signup-link">
                Sign Up
              </p>
            </div>
          </div>
          <div className="image-section col-4">
            <img src={grocery} alt="grocery" className="login-img" />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = () => {
  return {
    // user: user && user.props,
    // showAuthModal: user && user.isLoggedIn
  };
};

export const LoginForm = withRouter(
  connect(mapStateToProps)(LoginFormComponent)
);
