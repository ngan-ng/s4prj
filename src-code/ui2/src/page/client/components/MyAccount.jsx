import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { useEffect } from "react";
import { Fragment } from "react";

const MyAccount = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser == null) {
      navigate("/auth");
    }
  }, [currentUser]);

  return (
    <Fragment>
      <div>My Account Page</div>
    </Fragment>
  );
};

export default MyAccount;
