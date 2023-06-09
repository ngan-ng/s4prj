import './App.css';
import {RouterProvider, createBrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Home from './page/client/Home';
import Navigation from "./page/client/components/navigation/navigation.component";
import Footer from "./page/client/components/footer/footer.component";
import About from "./page/client/components/About";

import {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import MyAccount from "./page/client/components/MyAccount";
import Authentication from './page/client/components/authentication/authentication.component';
import {checkUserSession} from "./store/user/user.action";
import HeaderAdmin from "./page/admin/components/layout/header-admin.component";
import useStyle from "./hooks/useStyle";
import Booking from "./page/admin/Booking";
import Dashboard from "./page/admin/Dashboard";
import MainContent from "./page/admin/components/layout/main-content-admin.component";
import Sidebar from "./page/admin/components/layout/sidebar-admin.component";


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   }
// ]);
// function App() {
//   return (
//     <div>
//       <RouterProvider router={router}/>
//     </div>
//   );
// }

function MemberLayout() {
    return (
        <Fragment>
            <Navigation/>
            <Outlet/>
            <Footer/>
        </Fragment>
    )
}

function AdminLayout() {
    useStyle("./assets/css/bootstrap.min.css");
    useStyle("./assets/css/icons.min.css");
    useStyle("./assets/css/app.min.css");

    return (
        <Fragment>
            <div id="layout-wrapper">
                <HeaderAdmin/>
                <Sidebar/>
                <MainContent/>
            </div>
        </Fragment>
    )
}


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
        },[]);

    return (
        <Routes>
            <Route path="/" element={<MemberLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="about-us" element={<About/>}/>
                <Route path="auth" element={<Authentication/>}/>
                <Route path="my-account" element={<MyAccount/>}/>
            </Route>

            <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="booking" element={<Booking/>}/>
            </Route>
        </Routes>
    );
};

export default App;
