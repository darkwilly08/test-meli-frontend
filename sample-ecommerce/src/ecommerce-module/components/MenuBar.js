import "./MenuBar.sass";

import meliIcon from "ecommerce-module/assets/Logo_ML.png";
import SearchBox from "./SearchBox";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isBlank } from "utils/str";

function MenuBar() {
  const navigate = useNavigate();
  const onSearch = (text) => {
    if (isBlank(text)) {
      return;
    }
    navigate(`/items?search=${text}`);
  };
  return (
    <>
      <Navbar className="brand-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img src={meliIcon} alt="_blank"></img>
          </Navbar.Brand>
          <SearchBox onSearch={onSearch}></SearchBox>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuBar;
