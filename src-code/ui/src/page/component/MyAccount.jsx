import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentMember} from "../../store/member/member.selector";
import {useEffect} from "react";

const MyAccount = () => {
    const navigate = useNavigate();
    const currentMember = useSelector(selectCurrentMember);

    useEffect(() => {
        if (currentMember == null) {
            navigate("/sign-in");
        }
    }, [currentMember]);

    return (
        <>
            <div>My Account Page</div>
        </>
    );
};

export default MyAccount;
