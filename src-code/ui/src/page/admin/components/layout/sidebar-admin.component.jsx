import {Link} from "react-router-dom";

const Sidebar = () => {

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div className="user-profile text-center mt-3">
                    <div className="mt-3">
                        <h4 className="font-size-16 mb-1">Username</h4>
                    </div>
                </div>

                <div id="sidebar-menu">

                    <ul className="metismenu list-unstyled" id="side-menu">

                        <li>
                            <Link className="waves-effect" to="/admin">
                                <i className="ri-dashboard-line"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="menu-title">Booking</li>

                        <li>
                            <Link className="waves-effect" to="/admin/booking">
                                <i className="ri-dashboard-line"></i>
                                <span>Booking</span>
                            </Link>
                        </li>

                        <li className="menu-title">Baggage</li>

                        <li>
                            <a href="#" className="has-arrow waves-effect">
                                <i className="ri-mail-send-line"></i>
                                <span>Dropdown Menu</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="#">Menu Item</a></li>
                                <li><a href="#">Menu Item</a></li>
                            </ul>
                        </li>


                        <li className="menu-title">Components</li>

                        <li>
                            <a href="#" className="has-arrow waves-effect">
                                <i className="ri-share-line"></i>
                                <span>Multi Level</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="true">
                                <li><a href="#">Level 1.1</a></li>
                                <li><a href="#" className="has-arrow">Level 1.2</a>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li><a href="#">Level 2.1</a></li>
                                        <li><a href="#">Level 2.2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
