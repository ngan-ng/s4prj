import './App.css';
import {RouterProvider, createBrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Home from './page/Home';
import Navigation from "./page/component/navigation/navigation.component";
import Footer from "./page/component/footer/footer.component";
import About from "./page/component/About";
import Admin from "./page/component/Admin";
import SignUp from "./page/component/sign-up/sign-up.component";
import SignIn from "./page/component/sign-in/sign-in.component";
import {checkMemberSession} from "./store/member/member.action";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import MyAccount from "./page/component/MyAccount";

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
        <>
            <Navigation />
            <Outlet />
            <Footer />
        </>
    )
}

function AdminLayout() {
    return <Outlet />
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkMemberSession());
    }, []);

    return (
        <Routes>
            <Route path="/" element={<MemberLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="about-us" element={<About />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="my-account" element={<MyAccount />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin/>}/>
            </Route>
        </Routes>
    );
};

export default App;
