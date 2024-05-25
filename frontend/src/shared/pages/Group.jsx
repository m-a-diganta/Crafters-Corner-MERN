import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Avatar from "../components/UIElements/Avatar";
import axios from "axios";
import ProductList from "../../products/components/ProductList";
import { Link } from "react-router-dom";
import "./Group.css";

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
      <div className="home-page_box">
        <h1 className="product-headline">Products</h1>
        <div className="h-line"></div>
        <div className="product_container">
            {loadedProducts && <ProductList items={loadedProducts} />}
        </div>
        <div className="box-container">
            <div className="idea-box center">
                <Link to="/add-idea">Share Your Ideas</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
