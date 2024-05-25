import React, { useContext, useState } from "react";
import axios from "axios";

import "./AddIdea.css";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useNavigate } from "react-router-dom";

const AddIdea = () => {
  const auth = useContext(AuthContext);

  const [formContent, setFormContent] = useState({
    title: "",
    description: "",
  });

  const inputHandler = (id, value) => {
    setFormContent((prevContent) => ({ ...prevContent, [id]: value }));
  };

  const navigate = useNavigate();

  const ideaSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = formContent;
      const updatedData = { title, description };
      console.log(updatedData);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/ideas/new`,
        updatedData,
      );

      navigate("/group");
    }catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="center">
      <main className="add-idea-box">
        <form onSubmit={ideaSubmitHandler}>
          <div className="idea-info-box">
            <Input
              element="input"
              id="title"
              type="text"
              label="Title"
              placeholder="Idea Title"
              onInput={inputHandler}
              value={formContent.title}
            />
            <Input
              element="textarea"
              id="description"
              type="text"
              label="Description"
              placeholder="Idea Description"
              onInput={inputHandler}
              value={formContent.description}
            />
          </div>

          <div className="idea-submit-button">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddIdea;
