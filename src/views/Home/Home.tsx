import React, { PureComponent } from "react";
import { ContainerHoc } from "@components/ContainerHoc/ContainerHoc";
import "./styles/Home.style.scss";

interface IProjectsProps {
    history: any
    location: any;
}
interface IProjectsState {}

export class Projects extends PureComponent<IProjectsProps, IProjectsState> {
    state = {};

    render() {
        const { pathname } = this.props.location;
        return (
            <section className="projects-container">
                <ContainerHoc path={pathname}>
                    <section className="project-list-section">
                            <div className="row">
                                <div className="col-3">
                                    <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P1</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P2</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P3</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P4</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P5</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P6</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P7</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P8</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P9</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="project-card">
                                    <div className="project-image">
                                        <section className="project-placeholder-icon">
                                            <span>P10</span>
                                        </section>
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                </ContainerHoc>
                </section>
        )
    }
}