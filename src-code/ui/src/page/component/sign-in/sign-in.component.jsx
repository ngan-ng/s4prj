import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";


import "./sign-in.styles.css";
import {emailSignInStart, googleSignInStart} from "../../../store/member/member.action";
import {useNavigate} from "react-router-dom";
import {selectCurrentMember} from "../../../store/member/member.selector";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const currentMember = useSelector(selectCurrentMember);

    useEffect(() => {
        if (currentMember) {
            navigate("/my-account");
        }
    }, [currentMember]);

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
            navigate("/my-account");

        } catch (error) {
            if (error.code === "auth/user-not-found") {
                alert("Cannot found this email.");
            } else {
                console.log("member sign in failed", error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        // spread in object and modify one by one value of object
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="container">
            <div className="card">
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <Typography align="center" variant="h4">Sign In</Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            size="small"
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
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            Sign In With Google
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SignIn;
