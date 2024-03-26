import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
// import { Link } from 'react-router-dom'; // for navigation (optional)
import { Grid } from "@mui/material";
import Image from "./../images/SignUp.jpeg";
import axios from "axios";
function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password,
      });
      console.log("Signup successful!", response.data);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      if (error.response) {
        // Handle API error messages (e.g., username conflict)
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        setErrorMessage("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <Grid container flexDirection={"row"} sx={{ margin: "2vw" }}>
      <Grid item>
        <img src={Image} width={"600vw"} />
      </Grid>
      <Grid item sx={{ marginTop: "4vw", width: "30vw" }}>
        <div className="signup-page">
          <h1>Sign Up</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Username"
                variant="outlined"
                required
                value={username}
                onChange={handleUsernameChange}
              />
              <FormHelperText>
                {errorMessage ? "Username is required" : ""}
              </FormHelperText>
            </FormControl>
            {/* <FormControl margin="normal" fullWidth>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <FormHelperText>{errorMessage ? 'Email is required' : ''}</FormHelperText>
        </FormControl> */}
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <FormHelperText>
                {errorMessage ? "Password is required" : ""}
              </FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <FormHelperText>{errorMessage ? 'Passwords do not match' : ''}</FormHelperText>
            </FormControl>
            <Button variant="contained" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
          <p>
            {/* Already have an account? <Link to="/login">Login</Link> here. */}
          </p>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
