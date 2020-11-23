import { deleteCartItem, getCartItems } from "@services/promises/cartService";
import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import cartEmpty from "@assets/images/cartEmpty.jpg";
import "./styles/Cart.style.scss";
import { notification } from "antd";
import { decrementCartCount } from "@actions/index";

export interface ICartProps {
  history: any;
  userid: string;
}

export interface ICartState {
  cartItems: Array<any>;
}

class MyCart extends PureComponent<
  ICartProps & RouteComponentProps,
  ICartState
> {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    const { userid } = this.props;
    getCartItems(userid)
      .then((result) => {
        this.setState({ cartItems: result });
      })
      .catch((err) => {
        console.log("err..", err);
        this.setState({ cartItems: [] });
      });
  }

  goToProducts = () => {
    this.props.history.push("/products");
  };

  deleteProductFromCart = (productid) => {
    const { userid } = this.props;
    deleteCartItem(userid, productid)
      .then((result) => {
        notification.success({
          message: "Delete product from cart",
          description: result.message,
        });
        this.getAllCartItems();
        decrementCartCount();
      })
      .catch((err) => {
        console.log("err..", err);
      });
  };

  incrementQuantity = (obj) => {
    const arr = this.state.cartItems;
    const index = arr.findIndex(
      (eachrow) => eachrow.productId === obj.productId
    );
    arr[index].quantity = arr[index].quantity + 1;
    this.setState({ cartItems: [...arr] });
  };

  decrementQuantity = (obj) => {
    const arr = this.state.cartItems;
    const index = arr.findIndex(
      (eachrow) => eachrow.productId === obj.productId
    );
    if (arr[index].quantity > 1) {
      arr[index].quantity = arr[index].quantity - 1;
      this.setState({ cartItems: [...arr] });
    }
  };

  renderNoCartItems = () => {
    return (
      <section className="empty-cart-section d-flex justify-content-center align-items-center">
        <div className="col-6 empty-cart-wrapper">
          <img alt="cart" src={cartEmpty} />
          <h3>Your Cart is empty!</h3>
          <p>You have no items added in the cart.</p>
          <button className="add-product-btn" onClick={this.goToProducts}>
            Add Products
          </button>
        </div>
      </section>
    );
  };

  render() {
    const { cartItems } = this.state;
    const total = cartItems.reduce(
      (a, b) => a + b["quantity"] * b["oldPrice"],
      0
    );
    const discount = cartItems.reduce(
      (a, b) => a + b["quantity"] * b["oldPrice"] - b["quantity"] * b["price"],
      0
    );

    return cartItems.length > 0 ? (
      <section className="cart-items-section container">
        <h2 className="my-cart-title">{`My Cart (${cartItems.length})`}</h2>
        <div className="row">
          <div className="col-8">
            {cartItems.map((eachrow) => {
              return (
                <div className="cart-item-card">
                  <div>
                    <img alt="product" src={eachrow.productImage} />
                  </div>
                  <div className="prod-details-wrapper">
                    <span className="prod-name-span">
                      {eachrow.productName}
                    </span>
                    <div className="prod-price-wrapper">
                      <span className="prod-price-span">
                        ₹{eachrow.price * eachrow.quantity}.00
                      </span>
                      <span className="prod-old-price-span">
                        ₹{eachrow.oldPrice * eachrow.quantity}.00
                      </span>
                      <span className="you-save-span">
                        You Save ₹
                        {eachrow.oldPrice * eachrow.quantity -
                          eachrow.price * eachrow.quantity}
                        .00
                      </span>
                    </div>
                    <div className="increment-btn-wrapper">
                      <i
                        className="fa fa-minus-circle decrement-span"
                        aria-hidden="true"
                        onClick={() => this.decrementQuantity(eachrow)}
                      ></i>
                      <span className="quantity-span">{eachrow.quantity}</span>
                      <i
                        className="fa fa-plus-circle increment-span"
                        aria-hidden="true"
                        onClick={() => this.incrementQuantity(eachrow)}
                      ></i>
                    </div>
                  </div>
                  <div>
                    <i
                      className="fa fa-trash remove-btn"
                      aria-hidden="true"
                      onClick={() =>
                        this.deleteProductFromCart(eachrow.productId)
                      }
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-4">
            <div className="payment-details-card">
              <h4>Payment Details</h4>
              <div>
                <div className="total-price-wrapper">
                  <label>MRP Total</label>
                  <span>₹{total}.00</span>
                </div>
                <div className="total-price-wrapper">
                  <label>Product Discount</label>
                  <span>- ₹{discount}.00</span>
                </div>
                <div className="total-amt-wrapper">
                  <label>Total Amount</label>
                  <span>₹{total - discount}.00</span>
                </div>
                <div className="save-txt">You Save ₹{discount}.00</div>
              </div>
            </div>
            <div>
              <button className="place-order-btn">Place Order</button>
            </div>
          </div>
        </div>
      </section>
    ) : (
      this.renderNoCartItems()
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state.userinfo;
  return {
    userid: userData._id,
  };
};

export const Cart = withRouter(connect(mapStateToProps)(MyCart));
