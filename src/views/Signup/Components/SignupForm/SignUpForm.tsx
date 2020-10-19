import * as React from "react";
import "./styles/SignupForm.style.scss";
import { Loader } from "@components/Loader/Loader";

export interface ISignupFormState {}
export interface ISignupFormProps {}

export class SignupForm extends React.PureComponent<any, ISignupFormState> {
  state = {};

  render() {
    return (
      <section className="container">
        {/* <Loader /> */}
        <div className="signup-header">
          <strong className="black-name">Sign</strong>
          <strong className="blue-name"> up</strong>
        </div>
        <form className="signup-form">
          <div className="col-12 d-flex">
            <div className="col-6 form-grp">
              <label>First Name *</label>
              <input required type="text" placeholder="First Name" />
            </div>
            <div className="col-6 form-grp">
              <label>Last Name *</label>
              <input required type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 form-grp">
              <label>Email *</label>
              <input required type="email" placeholder="email" />
            </div>
            <div className="col-6 form-grp">
              <label>Contact No. *</label>
              <input
                required
                type="number"
                placeholder="Phone no."
                maxLength={10}
                minLength={10}
              />
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 form-grp">
              <label>Username *</label>
              <input required type="text" placeholder="Username" />
            </div>
            <div className="col-6 form-grp">
              <label>Password *</label>
              <input required type="password" placeholder="Password" />
            </div>
          </div>
          <div className="col-12 button-grp">
            <button className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}
