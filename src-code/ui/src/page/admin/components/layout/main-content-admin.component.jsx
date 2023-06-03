import {Outlet} from "react-router-dom";
import FooterAdmin from "./footer-admin.component";

const MainContent = () => {
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                    {/*start page title*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Dashboard</h4>
                            </div>
                        </div>
                    </div>
                    {/*end page title*/}

                    <Outlet/>

                </div>
            </div>
            <FooterAdmin/>
        </div>
    );
};

export default MainContent;
