import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Link } from 'react-router-dom'; // for navigation (optional)
import { Grid } from "@mui/material";
import Image from "./../images/SignUp.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        setErrors({ ...errors, confirmPassword: confirmPassword === value ? "" : "Passwords do not match" });
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrors({ ...errors, confirmPassword: password === value ? "" : "Passwords do not match" });
        break;
      default:
        break;
    }
  };

  const handleBlur = (field) => {
    switch (field) {
      case "firstName":
        setErrors({ ...errors, firstName: firstName ? "" : "First Name is required" });
        break;
      case "lastName":
        setErrors({ ...errors, lastName: lastName ? "" : "Last Name is required" });
        break;
      case "email":
        setErrors({ ...errors, email: email ? "" : "Email is required" });
        break;
      case "password":
        setErrors({ ...errors, password: password ? "" : "Password is required" });
        break;
      case "confirmPassword":
        setErrors({ ...errors, confirmPassword: confirmPassword ? "" : "Confirm Password is required" });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation logic can be added here before form submission
    // For example, you can check if passwords match, email format is correct, etc.
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log("Signup successful!", response.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, email: "Email is already in use" });
      } else {
        console.error("Error:", error.message);
        alert("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <Grid container flexDirection="row" sx={{ margin: "2vw" }}>
      <Grid item>
        <img src={Image} width="600vw" alt="signup" />
      </Grid>
      <Grid item sx={{ width: "30vw" }}>
        <div className="signup-page">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="First Name"
                variant="outlined"
                required
                value={firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                onBlur={() => handleBlur("firstName")}
              />
              <FormHelperText error>{errors.firstName}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Last Name"
                variant="outlined"
                required
                value={lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                onBlur={() => handleBlur("lastName")}
              />
              <FormHelperText error>{errors.lastName}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                onBlur={() => handleBlur("email")}
              />
              <FormHelperText error>{errors.email}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                onBlur={() => handleBlur("password")}
              />
              <FormHelperText error>{errors.password}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, "confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
              />
              <FormHelperText error>{errors.confirmPassword}</FormHelperText>
            </FormControl>
            <Button variant="contained" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link> here.
          </p>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
