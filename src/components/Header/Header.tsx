import React from "react";
import "./styles/Header.style.scss";
import grocery from "@assets/images/grocery.jpg";
import debounce from "lodash/debounce";
import { getGlobalSearchResult } from "@services/promises/productService";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUserData } from "@actions/index";
import { removeToken } from "@services/service";

export interface IHeaderProps {
  history: any;
  username: string;
  profile: string;
  cartCount: number;
}
export interface IHeaderState {
  searchString: string;
  searchResult: Array<object>;
  showDropdown: boolean;
}

class HeaderComponent extends React.PureComponent<IHeaderProps, IHeaderState> {
  state = {
    searchString: "",
    searchResult: [],
    showDropdown: false,
  };

  handleSearch = (e) => {
    this.setState({ searchString: e.target.value });
    this.getSearchResult();
  };

  toggleDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  };

  getSearchResult = debounce(() => {
    const { searchString } = this.state;
    if (searchString.trim().length > 0) {
      getGlobalSearchResult(searchString)
        .then((result) => {
          this.setState({ searchResult: result });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ searchResult: [] });
        });
    }
  }, 500);

  navigateToDetails = (id) => {
    this.setState({ searchString: "" }, () => {
      this.props.history.push(`/product-details/${id}`);
    });
  };

  navigateToCart = () => {
    this.props.history.push("/cart");
  };

  navigateToHome = () => {
    this.props.history.push("/products");
  };

  handleLogout = () => {
    deleteUserData();
    removeToken();
    this.props.history.push("/");
  };

  navigateToProfile = () => {
    this.setState({ showDropdown: false }, () => {
      this.props.history.push("/profile");
    });
  };

  navigateToOrders = () => {
    this.setState({ showDropdown: false }, () => {
      this.props.history.push("/orders");
    });
  };

  render() {
    const { searchString, searchResult, showDropdown } = this.state;
    const { username, profile, cartCount } = this.props;
    return (
      <header className="project-header">
        <section className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="brand-section">
              <p className="brand" onClick={this.navigateToHome}>
                Grocery Management App
              </p>
            </div>
            <div className="search-bar-container d-flex">
              <div className="input-group">
                <input
                  className="global-search-input-bar"
                  placeholder="Search essentials, groceries, and more …"
                  autoComplete="false"
                  type="text"
                  value={searchString}
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            <GlobalSearch
              searchString={searchString}
              result={searchResult}
              navigateToDetails={this.navigateToDetails}
            />
            <div className="profile-cart-section d-flex justify-content-between align-items-center">
              <div className="cart-container">
                <div className="cart-logo" onClick={this.navigateToCart}>
                  {cartCount > 0 ? (
                    <span className="counter-number">{cartCount}</span>
                  ) : null}
                </div>
              </div>
              <p
                className="profile-section d-flex align-items-center"
                onClick={this.toggleDropdown}
              >
                <img
                  src={profile ? profile : grocery}
                  alt="profile"
                  className="profile-img"
                />
                {`Hey, ${username}!`}
              </p>
            </div>
            {showDropdown && (
              <section className="profile-dropdown-section">
                <ul className="profile-dropdown">
                  <li
                    className="profile-dropdown-item"
                    onClick={this.navigateToProfile}
                  >
                    <i className="fa fa-user"></i> Profile
                  </li>
                  <li
                    className="profile-dropdown-item"
                    onClick={this.navigateToOrders}
                  >
                    <i className="fa fa-tag"></i> Orders
                  </li>
                  <li
                    className="profile-dropdown-item"
                    onClick={this.handleLogout}
                  >
                    <i className="fa fa-power-off"></i> Logout
                  </li>
                </ul>
              </section>
            )}
          </div>
        </section>
      </header>
    );
  }
}

export const GlobalSearch = (props) => {
  const { searchString, result, navigateToDetails } = props;
  return searchString.trim().length > 0 ? (
    <section className="global-search-result">
      <ul className="list-group">
        {result.length > 0 ? (
          result.map((eachrow) => {
            return (
              <li
                className="list-group-item d-flex"
                onClick={() => navigateToDetails(eachrow._id)}
              >
                <img
                  alt="product"
                  className="list-group-item-image"
                  src={eachrow.productImage}
                />
                <span className="list-group-item-name">{eachrow.name}</span>
                <span className="list-group-item-price">
                  ₹ {eachrow.price}.00
                </span>
              </li>
            );
          })
        ) : (
          <li className="list-group-item">
            <p className="list-group-item-no-result">No result found...</p>
          </li>
        )}
      </ul>
    </section>
  ) : null;
};

const mapStateToProps = (state) => {
  const { userData } = state.userinfo;
  const { cartCount } = state.cartInfo;
  return {
    username: userData.firstName,
    profile: userData.profile,
    userid: userData._id,
    cartCount: cartCount || 0,
  };
};

export const Header = withRouter(connect(mapStateToProps)(HeaderComponent));
