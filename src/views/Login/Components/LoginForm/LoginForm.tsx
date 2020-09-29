import * as React from "react";
import "./styles/LoginForm.style.scss";
import grocery from "@assets/images/grocery.jpg";

export interface ILoginFormState {}
export interface ILoginFormProps {}

export class LoginForm extends React.PureComponent<any, ILoginFormState> {
  state = {};

  render() {
    return (
      <section className="container login-form">
        <div className="col-12 d-flex login-form-wrapper">
          <div className="form-section col-8">
            <div className="sign-in-header">
              <strong className="sign">Sign </strong>
              <strong className="in">In</strong>
            </div>
            <form>
              <div className="login-input-wrapper">
                <input
                  placeholder="Username or Email"
                  className="login-input"
                ></input>
              </div>
              <div className="login-input-wrapper">
                <input placeholder="Password" className="login-input"></input>
              </div>
              <div className="forgot-password-checkbox-wrapper">
                <div className="stay-signin-wrapper">
                  <input type="checkbox" className="stay-signin-box"></input>
                  <p className="stay-signin">Stay signed in</p>
                </div>
                <div>
                  <a href="">Forgot Password?</a>
                </div>
              </div>
              <div className="login-input-wrapper">
                <button type="submit" className="submit-btn">
                  SIGN IN
                </button>
              </div>
            </form>
            <div className="sign-in-options-title">
                <div className="line" />
                <div className="options-title">Or Sign In with</div>
                <div className="line" />
            </div>
            <div className="social-btn-group">
                <button className="google-btn">google +</button>
                <button className="facebook-btn">facebook</button>
            </div>
            <div className="signup-link-wrapper">
                <p>Not a member?</p>
                <p><a href="" className="signup-link">Sign Up</a></p>
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
