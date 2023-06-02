import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";
import "./authentication.styles.css";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;
