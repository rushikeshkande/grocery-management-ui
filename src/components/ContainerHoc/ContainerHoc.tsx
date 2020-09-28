import React, { PureComponent } from 'react';
import './styles/ContainerHoc.style.scss';
import Header from '@components/Header/Header';
import { GlobalNavigation } from '@components/GlobalNavigation/GlobalNavigation';
import Footer from "@components/Footer/Footer";

interface IContainerHocProps {
    children?: any,
    path?: string
}
interface IContainerHocState {
    collapsed: boolean
}

export class ContainerHoc extends PureComponent<IContainerHocProps, IContainerHocState> {
    state = {
		collapsed: true
	}

	toggleSideNavExpansion = () => {
		this.setState({ collapsed: !this.state.collapsed });
    }

    closeSideNavExpansion = () => {
        this.setState({ collapsed: true });
    }
    
    render() {
        const { children, path } = this.props;
        const { collapsed } = this.state;
        return (
            <section className="high-order-global-container d-flex align-items-stretch" onClick={this.closeSideNavExpansion}>
                <section className={`global-sidenav-section ${collapsed ? 'sidenav-collapsed' : 'sidenav-expanded'}`}>
                    <GlobalNavigation toggleSideNavExpansion={this.toggleSideNavExpansion} path={path} sideNavCollapsed={collapsed} />
                </section>
                <section className="global-content-section">
                    <Header />
                    <section className="global-body-section" id="global-body-section">
                        {children}
                    </section>
                    <Footer />
                </section>
            </section>
        )
    }
}
