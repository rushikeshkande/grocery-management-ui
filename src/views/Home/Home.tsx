import React, { PureComponent } from "react";
import "./styles/Home.style.scss";
import { notification, Skeleton } from "antd";
import "antd/dist/antd.css";
import { getProducts, addProductToCart } from "@services/promises/productService";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { incrementCartCount } from "@actions/index";

interface IProjectsProps {
  history: any;
  location: any;
  userid: string;
}
interface IProductsState {
  products: Array<any>;
  loading: boolean;
}

class Products extends PureComponent<IProjectsProps, IProductsState> {
  state = {
    products: [],
    loading: true
  };

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    getProducts()
      .then((result) => {
        this.setState({ products: result, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ products: [], loading: false });
      });
  }

  addProductToCart = (obj) => {
    const { userid } = this.props;
    const payload = {
      userId: userid,
      productId: obj._id,
      price: obj.price,
      discount: obj.discount,
      productName: obj.name,
      productImage: obj.productImage[0],
      oldPrice: obj.oldPrice
    };
    addProductToCart(payload).then(result => {
      incrementCartCount();
      notification.success({
        message: "Add Product To Cart",
        description: result.message,
      });
    }).catch(err => {
      notification.error({
        message: "Add Product To Cart",
        description: "this product already exists in your cart..",
      });
    })
  }

  navigateToProductDetails = (id) => {
    this.props.history.push(`/product-details/${id}`);
  }

  render() {
    const { products, loading } = this.state;
    return (
      <section className="product-container">
              {loading && <Skeleton active paragraph={{rows:4}} />}
        <p className="all-products-title">ALL PRODUCTS</p>
        <section className="product-list-section">
          <div className="row">
            {products.map((eachrow,index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={eachrow.productImage[0]} alt="img" onClick={() => this.navigateToProductDetails(eachrow._id)} />
                    </div>
                    <span className="discount-section">
                      <span>{`${eachrow.discount}% OFF`}</span>
                    </span>
                    <div title={eachrow.name} className="product-name">{eachrow.name}</div>
                    <div className="product-price-section">
                      <span className="old-price">
                        ₹ {eachrow.oldPrice}.00
                      </span>
                      <span className="original-price">
                        ₹ {eachrow.price}.00
                      </span>
                    </div>
                    <div className="add-to-cart-wrapper">
                      <button className="add-to-cart-btn" onClick={() => this.addProductToCart(eachrow)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state.userinfo; 
  return {
    userid: userData._id
  };
};

export const Home =  withRouter(connect(mapStateToProps)(Products));
