import React, { useState, useContext } from "react";
import Styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Login() {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      setError(""); // Clear any previous errors
      setUserId(response.data.userId); // Set the user ID in the context
      navigate("/chats"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={Styles.maindiv}>
      <div className={Styles.innerdiv}>
        <div className={Styles.formcontainer}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={Styles.error}>{error}</p>}{" "}
          {/* Display error message */}
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
        <div className={Styles.imagediv}>
          <img src="public/Images/login.png"></img>
        </div>
      </div>
    </div>
  );
}
