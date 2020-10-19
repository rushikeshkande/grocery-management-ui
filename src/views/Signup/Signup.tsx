import * as React from "react";
import "./styles/Signup.style.scss";
import { SignupForm } from "./Components/SignupForm/SignUpForm";

export interface ILoginState{}
export interface ILoginProps{}

export class Signup extends React.PureComponent<any,ILoginState> {
    render() {
        return (
            <section>
                <SignupForm />
            </section>
        )
    }
}