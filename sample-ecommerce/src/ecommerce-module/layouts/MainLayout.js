import { Outlet } from "react-router-dom";
import MenuBar from "ecommerce-module/components/MenuBar";
// import { useTranslation} from 'react-i18next';

function MainLayout() {
  // const { t, i18n } = useTranslation();
  // i18n.changeLanguage('en');
  return (
    <>
      <MenuBar></MenuBar>
      <Outlet></Outlet>
    </>
  );
}

export default MainLayout;
