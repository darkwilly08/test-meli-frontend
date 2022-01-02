import "./App.sass";

import { Routes, Route, Link } from "react-router-dom";

import MainLayout from "ecommerce-module/layouts/MainLayout";

import ProductDetailsPage from "ecommerce-module/pages/ProductDetailsPage";
import SearchPage from "ecommerce-module/pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/items" element={<SearchPage />}></Route>
          <Route path="/items/:id" element={<ProductDetailsPage />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="perfect-centering">
              <div>NOT FOUND</div>
              <div>
                <Link to="/">Volver al inicio</Link>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
