import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import "./sign-up.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../../../store/user/user.action";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../../store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/my-account");
    }
  }, [currentUser]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password not match!");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email already in use");
      } else {
        console.log("Cannot create member", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // spread in object and modify one by one value of object
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="card-sign-up">
      <h2>Don't have an account?</h2>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Typography align="left" variant="h4">
            Sign Up
          </Typography>
        </Grid>

        <Grid item md={12} xs={12}>
          <TextField
            name="displayName"
            type="text"
            fullWidth
            size="small"
            label="Display Name"
            value={displayName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            name="email"
            type="email"
            fullWidth
            size="small"
            label="Email"
            value={email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            name="password"
            type="password"
            fullWidth
            size="small"
            label="Password"
            value={password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            name="confirmPassword"
            type="password"
            fullWidth
            size="small"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
