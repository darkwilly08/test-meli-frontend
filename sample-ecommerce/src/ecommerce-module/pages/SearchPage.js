import "./SearchPage.sass";
import "App.sass";

import { Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import CategoryPath from "ecommerce-module/components/CategoryPath";

import { STATUS } from "boot/api";

import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "ecommerce-module/stores/slices/products";
import { useEffect } from "react";
import SimplifiedProduct from "ecommerce-module/components/SimplifiedProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleProductClicked = (productId) => {
    navigate(`/items/${productId}`);
  };

  const dispatch = useDispatch();
  const { products, status, categories } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (searchParams.has("search")) {
      dispatch(fetchProducts(searchParams.get("search")));
    }
  }, [dispatch, searchParams]);

  let productsComponent = null;
  switch (status.products) {
    case STATUS.idle:
      productsComponent = (
        <ListGroupItem>
          <div>{t("ecommerce.search_ui.search_pending")}</div>
        </ListGroupItem>
      );
      break;
    case STATUS.loading:
      productsComponent = (
        <div className="perfect-centering">
          <Spinner animation="border"></Spinner>
        </div>
      );
      break;
    case STATUS.loaded:
      productsComponent =
        products.length > 0 ? (
          <ListGroup>
            {products.map((p) => {
              return (
                <SimplifiedProduct
                  onSelected={handleProductClicked}
                  product={p}
                  key={p.id}
                ></SimplifiedProduct>
              );
            })}
          </ListGroup>
        ) : (
          <ListGroupItem>
            <div>{t("ecommerce.search_ui.empty_result")}</div>
          </ListGroupItem>
        );
      break;
    case STATUS.error:
      productsComponent = <div>error</div>;
      break;
    default:
      productsComponent = <div>state unknown</div>;
  }

  return (
    <>
      <Container className="px-none mb-sm">
        <CategoryPath categories={categories}></CategoryPath>
        {productsComponent}
      </Container>
    </>
  );
}

export default SearchPage;
