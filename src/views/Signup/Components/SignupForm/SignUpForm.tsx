import * as React from "react";
import "./styles/SignupForm.style.scss";
import { notification } from "antd";
import { ImageUpload } from "@components/ImageUpload/ImageUpload";
import { RouteComponentProps, withRouter } from "react-router";
import { registerUser } from "@services/promises/loginService";

export interface ISignupFormState {}
export interface ISignupFormProps {
  history: any;
}

class SignupForm extends React.PureComponent<ISignupFormProps & RouteComponentProps, ISignupFormState> {
  state = {
    selectedFile: null,
    message: "",
    registerData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactNo: "",
      confirmPassword: "",
    },
  };

  handleSaveCroppedImage = (file: any) => {
    this.setState({ selectedFile: file });
  };

  handleChangeInput = (e) => {
    let registerData = this.state.registerData;
    registerData[e.target.name] = e.target.value;
    if (e.target.name === "confirmPassword") {
      registerData.password === e.target.value
        ? this.setState({ ...registerData, message: "" })
        : this.setState({
            ...registerData,
            message: "Confirm password must match password...",
          });
    } else {
      this.setState({ ...registerData });
    }
  };

  handleRegister = (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (this.state.selectedFile) {
      fetch(this.state.selectedFile, { mode: "no-cors" })
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "user-image.jpg", blob);
          formData.append("file",file,"user-image.jpg");
          formData.append("firstName", this.state.registerData.firstName);
          formData.append("lastName", this.state.registerData.lastName);
          formData.append("email", this.state.registerData.email);
          formData.append("contactNo", this.state.registerData.contactNo);
          formData.append("password", this.state.registerData.password);
          registerUser(formData).then(result => {
            notification.success({
              message: "User Registration",
              description: "You have registered with us successfully.."
            });
            this.props.history.push("/");
          }).catch(err => {
            console.log("error..", err);
            notification.error({
              message: "User Registration",
              description: "User already exists.."
            });
          });
        });
    } else {
      formData.append("firstName", this.state.registerData.firstName);
      formData.append("lastName", this.state.registerData.lastName);
      formData.append("email", this.state.registerData.email);
      formData.append("contactNo", this.state.registerData.contactNo);
      formData.append("password", this.state.registerData.password);
      registerUser(formData).then(result => {
        notification.success({
          message: "User Registration",
          description: "You have registered with us successfully.."
        });
        this.props.history.push("/");
      }).catch(err => {
        console.log("error..", err);
        notification.error({
          message: "User Registration",
          description: "User already exists.."
        });
      });
    }    
  };

  handleCancel = () => {
    this.props.history.push("/");
  }

  render() {
    const { message, registerData } = this.state;
    return (
      <section className="container signup-container">
        <div className="signup-header">
          <strong className="black-name">Sign</strong>
          <strong className="blue-name"> up</strong>
        </div>
        <div>
          <ImageUpload handleSaveCropper={this.handleSaveCroppedImage} />
        </div>
        <form className="signup-form" onSubmit={this.handleRegister}>
          <div className="col-sm-12 d-flex">
            <div className="col-sm-6 form-grp">
              <label>First Name *</label>
              <input
                required
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={this.handleChangeInput}
                value={registerData.firstName}
              />
            </div>
            <div className="col-sm-6 form-grp">
              <label>Last Name *</label>
              <input
                required
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={this.handleChangeInput}
                value={registerData.lastName}
              />
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 form-grp">
              <label>Email *</label>
              <input
                required
                name="email"
                type="email"
                placeholder="email"
                onChange={this.handleChangeInput}
                value={registerData.email}
              />
            </div>
            <div className="col-6 form-grp">
              <label>Contact No. *</label>
              <input
                required
                type="number"
                placeholder="Phone no."
                maxLength={10}
                minLength={10}
                name="contactNo"
                onChange={this.handleChangeInput}
                value={registerData.contactNo}
              />
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 form-grp">
              <label>Password *</label>
              <input
                required
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChangeInput}
                value={registerData.password}
              />
            </div>
            <div className="col-6 form-grp">
              <label>Confirm Password *</label>
              <input
                required
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChangeInput}
                value={registerData.confirmPassword}
              />
              <p>{message}</p>
            </div>
          </div>
          <div className="col-12 button-grp">
            <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
            <button
              disabled={
                registerData.password === registerData.confirmPassword
                  ? false
                  : true
              }
              type="submit"
              className="save-btn"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(SignupForm);
