import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Avatar from "../components/UIElements/Avatar";

const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      {auth.isLoggedIn ? (
        <>
          <h1>Welcome {auth.username}</h1>
          <Avatar
            image={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${
              auth.userImage
            }`}
            width="6rem"
            alt="hello"
          />
        </>
      ) : (
        <h1>Welcome User</h1>
      )}
    </div>
  );
};

export default Home;
