import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography } from "@mui/material";

import "./sign-in.styles.css";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../../../store/user/user.action";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../../store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
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

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Cannot found this email.");
      } else {
        console.log("User sign in failed", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // spread in object and modify one by one value of object
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="card-sign-in">
      <h2>Already have an account?</h2>

      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Typography align="left" variant="h4">
            Sign In
          </Typography>
        </Grid>

        <Grid item md={12} xs={12}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            size="small"
            required
            onChange={handleChange}
            value={email}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            label="Password"
            name="password"
            fullWidth
            size="small"
            type="password"
            required
            onChange={handleChange}
            value={password}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button variant="contained" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
