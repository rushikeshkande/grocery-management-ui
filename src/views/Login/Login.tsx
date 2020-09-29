import * as React from "react";
import { LoginForm } from "./Components/LoginForm/LoginForm";
import "./styles/Login.style.scss";

export interface ILoginState{}
export interface ILoginProps{}

export class Login extends React.PureComponent<any,ILoginState> {
    render() {
        return (
            <section className="login-page">
                <LoginForm />
            </section>
        )
    }
}