import {Link} from "react-router-dom";
import { Fragment } from "react"; 

import "./navigation.styles.css";
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentUser } from "../../../../store/user/user.selector";
import { signOutStart } from "../../../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
  
    const signOutUser = () => dispatch(signOutStart());
    console.log("currentUser", currentUser);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo" to="/">
                    <div>logo</div>
                </Link>
                <div className="nav-links">
                    <Link className="nav-link" to="/about-us">About Us</Link>

                    {currentUser ? (
                        <Fragment>
                            <Link className="nav-link" onClick={signOutUser}>Sign Out</Link>
                            <Link className="nav-link" to="/my-account">My Account</Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link className="nav-link" to="/auth">Sign In</Link>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Navigation;
