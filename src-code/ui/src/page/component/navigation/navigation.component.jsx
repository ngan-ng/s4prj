import {Link} from "react-router-dom";

import "./navigation.styles.css";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentMember} from "../../../store/member/member.selector";
import {signOutStart} from "../../../store/member/member.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentMember = useSelector(selectCurrentMember);
    const signOutMember = () => dispatch(signOutStart());
    console.log("currentMember", currentMember);

    return (
        <>
            <div className="navigation">
                <Link className="logo" to="/">
                    <div>logo</div>
                </Link>
                <div className="nav-links">
                    <Link className="nav-link" to="/about-us">About Us</Link>

                    {currentMember ? (
                        <>
                            <Link className="nav-link" to="/sign-in" onClick={signOutMember}>Sign Out</Link>
                            <Link className="nav-link" to="/my-account">My Account</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/sign-up">Sign Up</Link>
                            <Link className="nav-link" to="/sign-in">Sign In</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navigation;
