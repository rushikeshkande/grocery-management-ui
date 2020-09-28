import React, { PureComponent } from "react";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import './styles/GlobalNavigation.style.scss';
import menuIcon from '@assets/icons/menu.svg';

interface IGlobalNavigationProps {
	history?: any;
	path?: string;
	toggleSideNavExpansion?: () => void,
	sideNavCollapsed?: boolean
}
interface IGlobalNavigationState { }

const navItems = [
	// { icon: 'my_work', label: 'My Work', route: '/' },
	{ icon: 'projects', label: 'Projects', route: '/projects' },
	{ icon: 'glossaries', label: 'Glossaries', route: '/glossaries' },
	{ icon: 'variables', label: 'Variables', route: '/variables' },
	{ icon: 'api_headers', label: 'API Headers', route: '/api-headers' },
	{ icon: 'properties', label: 'Properties', route: '/properties' },
	{ icon: 'files', label: 'Files', route: '/files' }
]

class GlobalNavigationRoute extends PureComponent<IGlobalNavigationProps & RouteComponentProps, IGlobalNavigationState> {
	toggleSideNavExpansion = (elem: { stopPropagation: () => void; }) => {
		elem.stopPropagation();
		this.props.toggleSideNavExpansion();
	}
	render() {
		const { path, history, sideNavCollapsed } = this.props;
		let activeMenu: string;
		if (path.includes('/projects') ||
			path.includes('/project-details') ||
			path.includes('/project-dashboard') ||
			path.includes('/project-configuration') ||
			path.includes('/project-api-browser') ||
			path.includes('/project-content')) {
			activeMenu = 'Projects'
		} else if (path.includes('/glossaries')) {
			activeMenu = 'Glossaries'
		} else if (path.includes('/variables')) {
			activeMenu = 'Variables'
		} else if (path.includes('/api-headers')) {
			activeMenu = 'API Headers'
		} else if (path.includes('/properties')) {
			activeMenu = 'Properties'
		} else if (path.includes('/files')) {
			activeMenu = 'Files'
		}
		return (
			<section className="global-navigation">
				<ul className="nav-items-list">
					<li className="nav-item global-nav-item expander-container">
						<img src={menuIcon} alt="_toggleNav" role="button" onClick={this.toggleSideNavExpansion} title="Toggle Navigation" />
					</li>
					{navItems.map((item, key) => (
						<React.Fragment key={key}>
							<NavigationItem
								path={path}
								activeMenu={activeMenu}
								icon={item.icon}
								label={item.label}
								onClick={() => history.push(item.route)}
								sideNavCollapsed={sideNavCollapsed} />
						</React.Fragment>
					))}
				</ul>
			</section>
		)
	}
}

const NavigationItem = ({ path, activeMenu, icon, label, onClick, sideNavCollapsed }) => {
	if (path === '/') {
		return (
			<li
				className={`nav-item global-nav-item ${label === navItems[0].label ? 'active-nav' : 'not-active-nav'}`}
				onClick={onClick}>
				<img src={require(`@assets/icons/${icon}${label === navItems[0].label ? '_active' : ''}.svg`)} alt={`${label}`} title={label} className="global-menu-icon" />
				<p className="nav-item-label">{label}</p>
			</li>
		)
	}
	return (
		<li
			className={`nav-item global-nav-item ${activeMenu === label ? 'active-nav' : 'not-active-nav'}`}
			onClick={onClick}>
			<img src={require(`@assets/icons/${icon}${activeMenu === label ? '_active' : ''}.svg`)} alt={`${label}`} title={label} className="global-menu-icon" />
			{!sideNavCollapsed && <p className="nav-item-label">{label}</p>}
		</li>
	)
}

export const GlobalNavigation = withRouter(GlobalNavigationRoute);
