import React, { useState } from "react";
import Styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      
      navigate("/"); // Redirect to the home page after successful signup
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={Styles.maindiv}>
      <div className={Styles.innerdiv}>
        <div className={Styles.formcontainer}>
          <h1>Signup</h1>
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

          {/* Display error message */}
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div className={Styles.imagediv}>
          <img src="public/Images/login.png"></img>
        </div>
      </div>
    </div>
  );
}
