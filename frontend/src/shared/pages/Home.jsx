import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Avatar from "../components/UIElements/Avatar";
import axios from "axios";
import ProductList from "../../products/components/ProductList";

const Home = () => {
  const auth = useContext(AuthContext);
  const [loadedProducts, setLoadedProducts] = useState();

  const fetchProducts = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/`
      );

      setLoadedProducts(responseData.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page_container">
      <div className="home-page__box">
        <h1 className="product-headline">Products</h1>
        <div className="h-line"></div>
        <div className="product_container">
          {loadedProducts && <ProductList items={loadedProducts} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
