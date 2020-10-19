import * as React from "react";
import "./styles/Loader.style.scss";

export interface ILoaderState {}
export interface ILoaderProps {}

export class Loader extends React.PureComponent<any, ILoaderState> {
    state = {};

    render() {
        return (
            <section className="global-loader-component">
                <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
                <p className="loading-label">Fetching Projects</p>
            </section>
        )
    }
}