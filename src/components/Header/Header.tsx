import React from 'react';
import "./styles/Header.style.scss";

export interface IHeaderProps { }
export interface IHeaderState { }


class Header extends React.PureComponent<any,IHeaderState> {
    state = {};

    componentDidMount() {
		const header = document.getElementById("page-header");
		const pageBody = document.getElementById("global-body-section");
		if (header instanceof HTMLElement && pageBody instanceof HTMLElement) {
			const headerHeight = header.offsetHeight;
			pageBody.style.paddingTop = `${Number(headerHeight)}px`;
		}
	}

    render() {
        return (
            <header className="project-header">
                <section className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="brand-section">
                            <p className="brand">Grocery Management App</p>
                        </div>
                    </div>
                </section>
            </header>
        )
    }
}

export default Header;