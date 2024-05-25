import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Avatar from "../components/UIElements/Avatar";
import axios from "axios";
import ProductList from "../../products/components/ProductList";
import { Link } from "react-router-dom";
import "./Group.css";
import IdeaList from "../components/IdeaList";

const Home = () => {
  const auth = useContext(AuthContext);
  const [loadedIdeas, setLoadedIdeas] = useState();

  const fetchProducts = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/ideas/`
      );

      setLoadedIdeas(responseData.data.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page_container">
      <div className="group-page__box">
        <h1 className="product-headline">Ideas</h1>
        <div className="h-line"></div>
        <div className="idea_container">
            {loadedIdeas && <IdeaList items={loadedIdeas} />}
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
