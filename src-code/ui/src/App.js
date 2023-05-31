import './App.css';
import {RouterProvider, createBrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Home from './page/Home';
import Navigation from "./page/components/navigation/navigation.component";
import Footer from "./page/components/footer/footer.component";
import About from "./page/components/About";
import Admin from "./page/components/Admin";

import {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import MyAccount from "./page/components/MyAccount";
import Authentication from './page/components/authentication/authentication.component';
import { checkUserSession } from "./store/user/user.action";

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
            <Navigation />
            <Outlet />
            <Footer />
        </Fragment>
    )
}

function AdminLayout() {
    return <Outlet />
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
      }, []);

    return (
        <Routes>
            <Route path="/" element={<MemberLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="about-us" element={<About />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="my-account" element={<MyAccount />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin/>}/>
            </Route>
        </Routes>
    );
};

export default App;
