import { getProductDetails } from "@services/promises/productService";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

export interface ProductDetailsProps {
  match: any;
}

export interface ProductDetailsState {
  productDetails: any;
}

class ProductDetailsComponent extends PureComponent<
  RouteComponentProps & ProductDetailsProps,
  ProductDetailsState
> {
  state = {
    productDetails: {
      productImage: [],
      description: "",
      name: "",
      oldPrice: 0,
      price: 0,
    },
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    let images = [];
    getProductDetails(id)
      .then((result) => {
        images = result.productImage.map((eachImage) => {
          let obj = {
            original: eachImage,
            thumbnail: eachImage,
          };
          return obj;
        });
        result["productImage"] = images;
        this.setState({ productDetails: result });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ productDetails: {} });
      });
  }

  render() {
    const { productDetails } = this.state;
    const { productImage } = productDetails;
    return (
      <div>
        <div
          className="container-fluid"
          style={{
            padding: "100px 30px 0 30px",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="row"
            style={{
              borderBottom: "2px solid #ececec",
              margin: "0 0 1em 0",
              paddingBottom: "2em",
            }}
          >
            <div className="col-6">
              <ImageGallery
                items={productImage}
                infinite={false}
                showPlayButton={false}
                showNav={false}
                thumbnailPosition="left"
                showFullscreenButton={false}
              />
            </div>
            <div className="col-6">
              <h4>{productDetails.name}</h4>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                <span style={{ padding: "0 12px 0 0" }}>
                  {"M.R.P: "}
                  <span style={{ textDecoration: "line-through" }}>
                    ₹ {productDetails.oldPrice}.00
                  </span>
                </span>
                <span>
                  {"Price: "}
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    ₹ {productDetails.price}.00
                  </span>
                </span>
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                <span style={{ paddingRight: "12px" }}>
                  {"You Save: "}
                  <span style={{ color: "#00a651" }}>
                    ₹ {productDetails.oldPrice - productDetails.price}
                    .00
                  </span>
                </span>
                <span>Inclusive of all taxes</span>
              </div>
              <div
                style={{
                  marginBottom: "16px",
                  color: "#00a651",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                In Stock
              </div>
              <div>
                <button
                  style={{
                    width: "150px",
                    height: "40px",
                    backgroundColor: "#008ecc",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <section
            style={{
              borderBottom: "2px solid #ececec",
              margin: "0 0 16px",
              padding: "0 0 16px",
            }}
          >
            <h5>Description</h5>
            <p style={{ marginLeft: "2em" }}>{productDetails.description}</p>
          </section>
        </div>
      </div>
    );
  }
}

export const ProductDetails = withRouter(ProductDetailsComponent);
