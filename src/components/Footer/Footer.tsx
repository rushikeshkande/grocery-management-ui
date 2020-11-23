import React from 'react';
import './styles/Footer.style.scss';

export interface IFooterProps {}
export interface IFooterState {}


class FooterComponent extends React.PureComponent<any,IFooterState> {
    
    render() {
        return (
            <footer className="project-footer">
                <section className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="footer-section">
                            <p className="footer-name">About Us</p>
                        </div>
                    </div>
                </section>
            </footer>
        )
    }
}

export default FooterComponent;