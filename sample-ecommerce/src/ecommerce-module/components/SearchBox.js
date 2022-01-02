import "./SearchBox.sass";
import searchIcon from "ecommerce-module/assets/ic_Search.png";
import { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function SearchBox(props) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const onSubmit = () => {
    props.onSearch(value);
  };

  return (
    <>
      <InputGroup>
        <FormControl
          placeholder={t("ecommerce.header.search_label")}
          aria-label={t("ecommerce.header.search_label")}
          aria-describedby="basic-addon2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSubmit();
            }
          }}
        />
        <Button className="search-button" id="button-addon2" onClick={onSubmit}>
          <img src={searchIcon} alt="_blank"></img>
        </Button>
      </InputGroup>
    </>
  );
}

export default SearchBox;
