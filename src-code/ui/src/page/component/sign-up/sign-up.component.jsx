import React, {useState} from "react";
import {
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import "./sign-up.styles.css";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../../store/member/member.action";
import { useNavigate } from "react-router-dom";


const defaultFormFields = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    firstName: "",
    lastName: "",
    mobile: "",
}

const SignUp = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { firstName, lastName,displayName, mobile, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

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
            dispatch(signUpStart(email, password, firstName,displayName, lastName, mobile));
            resetFormFields();
            navigate("/sign-in");

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
        <div className="container">
            <div className="card">
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <Typography align="center" variant="h4">Sign Up</Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            name="email"
                            fullWidth
                            size="small"
                            label="Email"
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
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            name="displayName"
                            fullWidth
                            size="small"
                            label="Display Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            name="firstName"
                            fullWidth
                            size="small"
                            label="First Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            name="lastName"
                            fullWidth
                            size="small"
                            label="Last Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            name="mobile"
                            type="number"
                            fullWidth
                            size="small"
                            label="Mobile"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SignUp;
