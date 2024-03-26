import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import lOGIN from "./../images/Login.jpeg";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log(email,password);
      const response = await axios.post("http://localhost:8081/api/v1/auth/signin", {
        email,
        password,
      }); // Adjust the URL if needed
  
      // Handle successful login
      console.log("Login successful:", response.data);
      
      // Store authentication token (if applicable)
      // Redirect to the main application or dashboard
      setEmail("");
      setPassword("");
      setErrorMessage(""); // Clear any previous errors
      navigate("/");
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  
  
  };

  return (
    <Grid container flexDirection={"row"} sx={{ marginLeft: "6vw" }}>
      <Grid item>
        <img src={lOGIN} width={"500vw"} />
      </Grid>
      <Grid item sx={{ marginTop: "8vw", marginLeft: "7vw" }}>
        <div className="login-page">
          <h1>Login</h1>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              value={email}
              onChange={handleEmailChange}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
