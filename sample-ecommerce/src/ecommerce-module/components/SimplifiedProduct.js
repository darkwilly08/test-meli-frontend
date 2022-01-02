import "App.sass";
import "./SimplifiedProduct.sass";
import shippingIcon from "ecommerce-module/assets/ic_shipping.png";

import { Col, Container, ListGroup, Row, Stack } from "react-bootstrap";
import { toLocale } from "utils/number";

function SimplifiedProduct(props) {
  const product = props.product;
  return (
    <>
      <ListGroup.Item
        className="product p-sm"
        action
        onClick={() => props.onSelected(product.id)}
      >
        <Stack direction="horizontal">
          <div className="img-container">
            <img src={product.picture} alt="ups.."></img>
          </div>
          <Container className="ml-sm p-none">
            <Row style={{ alignItems: "center" }}>
              <Col sm={8}>
                <Stack>
                  <div className="price">
                    $ {toLocale(Math.floor(product.price.amount))}{" "}
                    {product.free_shipping ? (
                      <div className="shipping-icon">
                        <img src={shippingIcon} alt="ups"></img>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="title">{product.title}</div>
                </Stack>
              </Col>
              <Col sm={4}>
                <div className="location">{product.condition}</div>
              </Col>
            </Row>
          </Container>
        </Stack>
      </ListGroup.Item>
    </>
  );
}

export default SimplifiedProduct;
