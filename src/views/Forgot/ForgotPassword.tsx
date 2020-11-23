import { forgotUser } from "@services/promises/loginService";
import { notification } from "antd";
import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./styles/ForgotPassword.style.scss";

export interface IForgotPasswordProps {
  history: any;
}

export interface IForgotPasswordState {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
}

class ForgotPasswordComponent extends PureComponent<
  RouteComponentProps & IForgotPasswordProps,
  IForgotPasswordState
> {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  };

  handleChangeInput = (e) => {
    switch (e.target.name) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "confirmPassword":
        if (this.state.password === e.target.value) {
          this.setState({ confirmPassword: e.target.value, message: "" });
        } else {
          this.setState({
            confirmPassword: e.target.value,
            message: "The password you entered is not the same.",
          });
        }
        break;
      default:
        break;
    }
  };

  handleCancel = () => {
      this.props.history.push("/");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    forgotUser(payload)
      .then(() => {
        this.props.history.push("/");
        notification.success({
          message: "Reset Password",
          description: "You have changed password successfully...",
        });
      })
      .catch((err) => {
        console.log("errr..", err);
        notification.error({
          message: "Reset Password Error",
          description: "User does not exists...",
        });
      });
  };

  render() {
    const { email, password, confirmPassword, message } = this.state;
    return (
      <section className="forgot-section">
        <div className="forgot-form-wrapper col-6">
          <h3 className="reset-heading">Reset your password</h3>
          <p>Enter a new password for your account.</p>
          <form onSubmit={this.handleSubmit}>
            <div className="forgot-form-grp">
              <label>Email</label>
              <input
                name="email"
                value={email}
                type="email"
                required
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="forgot-form-grp">
              <label>New Password</label>
              <input
                name="password"
                value={password}
                type="password"
                required
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="forgot-form-grp">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                value={confirmPassword}
                type="password"
                required
                onChange={this.handleChangeInput}
              />
              {message ? <div className="warn-message">{message}</div> : null}
            </div>
            <button className="cancel-btn" onClick={this.handleCancel}>
                Cancel
            </button>
            <button
              type="submit"
              className="reset-btn"
              disabled={message ? true : false}
            >
              Reset password
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export const ForgotPassword = withRouter(ForgotPasswordComponent);
