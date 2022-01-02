import "./ProductDetailsPage.sass";
import "App.sass";
import shippingIcon from "ecommerce-module/assets/ic_shipping.png";

import CategoryPath from "ecommerce-module/components/CategoryPath";
import { Button, Container, ListGroupItem, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductById } from "ecommerce-module/stores/slices/products";
import { STATUS } from "boot/api";
import { onlyDecimalPart, toLocale } from "utils/number";

function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedProduct, status } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  let productComponent = null;
  let categories = null;
  switch (status.productDetails) {
    case STATUS.idle:
      productComponent = <div></div>;
      break;
    case STATUS.loading:
      productComponent = (
        <div className="perfect-centering">
          <Spinner animation="border"></Spinner>
        </div>
      );
      break;
    case STATUS.loaded:
      categories = selectedProduct ? selectedProduct.categories : null;
      productComponent = selectedProduct ? (
        <>
          <div className="product-info">
            <div className="left">
              <div className="img-container">
                <img src={selectedProduct.picture} alt="ups.."></img>
              </div>
              <div className="desc-section">
                <div className="title mb-md">
                  {t("ecommerce.product_details.desc_label")}
                </div>
                <div className="text mb-md">{selectedProduct.description}</div>
              </div>
            </div>
            <div className="right">
              <div>
                <div className="condition">
                  {selectedProduct.condition} - {selectedProduct.sold_quantity}{" "}
                  {t("ecommerce.product_details.sold_label")}
                  {selectedProduct.free_shipping ? (
                    <div className="shipping-icon">
                      <img src={shippingIcon} alt="ups"></img>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="title">{selectedProduct.title}</div>
                <div className="price">
                  $ {toLocale(Math.floor(selectedProduct.price.amount))}
                  <span className="cents">
                    {onlyDecimalPart(
                      selectedProduct.price.amount,
                      selectedProduct.price.decimals
                    )}
                  </span>
                </div>
                <Button className="buy-btn">
                  {t("ecommerce.product_details.buy_label")}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ListGroupItem>
          <div>
            {t("ecommerce.product_details.empty_result", { productId })}
          </div>
        </ListGroupItem>
      );

      break;
    case STATUS.error:
      productComponent = <div>error</div>;
      break;
    default:
      productComponent = <div>state unknown</div>;
  }

  return (
    <>
      <>
        <Container className="px-none mb-sm">
          <CategoryPath categories={categories}></CategoryPath>
          {productComponent}
        </Container>
      </>
    </>
  );
}

export default ProductDetailsPage;
