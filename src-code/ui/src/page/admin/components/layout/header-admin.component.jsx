import {Link} from "react-router-dom";
const HeaderAdmin = () => {

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">

                    <div className="navbar-brand-box">
                        <Link className="logo logo-light" to="/admin">
                                <span className="logo-sm">
                                    Logo
                                    {/*<img src="./assets/images/logo-sm.png" alt="logo-sm-light" height="22"/>*/}
                                </span>
                                <span className="logo-lg">
                                    Logo
                                    {/*<img src="./assets/images/logo-light.png" alt="logo-light" height="20"/>*/}
                                </span>
                        </Link>
                    </div>

                    <button type="button" className="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                        <i className="ri-menu-2-line align-middle"></i>
                    </button>

                    <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input type="text" className="form-control" placeholder="Search..."/>
                            <span className="ri-search-line"></span>
                        </div>
                    </form>

                </div>

                <div className="d-flex">

                    <div className="dropdown d-inline-block d-lg-none ms-2">
                        <button type="button" className="btn header-item noti-icon waves-effect"
                                id="page-header-search-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="ri-search-line"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                             aria-labelledby="page-header-search-dropdown">

                            <form className="p-3">
                                <div className="mb-3 m-0">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search ..."/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit"><i
                                                className="ri-search-line"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block user-dropdown">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="d-none d-xl-inline-block ms-1">Username</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">

                            <a className="dropdown-item" href="#"><i
                                className="ri-user-line align-middle me-1"></i> Profile</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item text-danger" href="#"><i
                                className="ri-shut-down-line align-middle me-1 text-danger"></i> Logout</a>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};
export default HeaderAdmin;
