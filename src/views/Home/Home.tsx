import React, { PureComponent } from "react";
import "./styles/Home.style.scss";
import { DatePicker, Space, notification  } from 'antd';
import 'antd/dist/antd.css';

interface IProjectsProps {
  history: any;
  location: any;
}
interface IProjectsState {}

export class Projects extends PureComponent<IProjectsProps, IProjectsState> {
  state = {
    showSearch: false,
    searchString: "",
    selected: true
  };

  handleSearch = (e) => {
    this.setState({ searchString: e.target.value});
  }

  handleCancelSearch = () => {
    this.setState({ showSearch: false, searchString: ""});
  }

  enableSearch = () => {
    this.setState({ showSearch: true});
  }

  isSelected = () => {
    this.setState({ selected: !this.state.selected});
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
    notification.success({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  render() {
    const { showSearch, searchString } = this.state;
    return (
      <section className="product-container">
        <section className="product-list-section">
          <header className="product-header d-flex align-items-center justify-content-between">
            <h1>Products</h1>
            <div className="button-icon-container d-flex align-items-center">
              <div className="search-project-container">
                <section className="searchbar-section">
                  {showSearch ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="search-input"
                        placeholder="search products"
                        value={searchString}
                        onChange={this.handleSearch}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          <i
                            className="material-icons"
                            onClick={this.handleCancelSearch}
                            title="Cancel search"
                          >
                            cancel
                          </i>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <i
                      className="material-icons"
                      onClick={this.enableSearch}
                    >
                      search
                    </i>
                  )}
                </section>
              </div>
            </div>
          </header>
          <div className="row">
            <div className="col-3">
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTudQ7U2xGC84O3EAc_8WatoACuUkntztV-D3Z5F-IP0kGvDdIdEqnLVtSG348n9djPJ75fPKYeGYo0RngKLG7MSdoOjtNKPoWaIuaOr-N-v6vJBurFDSEr&usqp=CAY"
                    }
                    alt="img"
                  />
                </div>
                  <span className="discount-section">
                    <span>{"7% OFF"}</span>
                  </span>
                <span className="product-name">T-shirt</span>
                <div className="product-price-section">
                  <span className="original-price">500</span>
                  <span className="old-price">550</span>
                </div>
                <i className="fa fa-ellipsis-v" aria-hidden="true" onClick={this.isSelected}></i>
                {this.state.selected && <div className="project-context-menu">
                  <ul>
                    <li>Delete</li>
                    <li>Update</li>
                  </ul>
                  </div>}
              </div>
            </div>
            <div className="col-3">
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTudQ7U2xGC84O3EAc_8WatoACuUkntztV-D3Z5F-IP0kGvDdIdEqnLVtSG348n9djPJ75fPKYeGYo0RngKLG7MSdoOjtNKPoWaIuaOr-N-v6vJBurFDSEr&usqp=CAY"
                    }
                    alt="img"
                  />
                </div>
                <span className="discount-section">
                    <span>{"7% OFF"}</span>
                  </span>
                <strong className="product-name">T-shirt</strong>
                <Space direction="vertical">
                <DatePicker onChange={this.onChange} />
                </Space>
              </div>
            </div>
            <div className="col-3">
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTudQ7U2xGC84O3EAc_8WatoACuUkntztV-D3Z5F-IP0kGvDdIdEqnLVtSG348n9djPJ75fPKYeGYo0RngKLG7MSdoOjtNKPoWaIuaOr-N-v6vJBurFDSEr&usqp=CAY"
                    }
                    alt="img"
                  />
                </div>
                <span className="discount-section">
                    <span>{"7% OFF"}</span>
                  </span>
                <strong className="product-name">T-shirt</strong>
              </div>
            </div>
            <div className="col-3">
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTudQ7U2xGC84O3EAc_8WatoACuUkntztV-D3Z5F-IP0kGvDdIdEqnLVtSG348n9djPJ75fPKYeGYo0RngKLG7MSdoOjtNKPoWaIuaOr-N-v6vJBurFDSEr&usqp=CAY"
                    }
                    alt="img"
                  />
                </div>
                <span className="discount-section">
                    <span>{"7% OFF"}</span>
                  </span>
                <strong className="product-name">EYEBOGLER Regular Fit Men's Striped Yellow T-Shirt (T305-AS10YLDNWH_1)</strong>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
