import { lazy } from 'react';

// project imports
import MainLayout from 'layout/client/MainLayout';
// import HomePage from 'views/client/home/index';
import Loadable from 'ui-component/Loadable';
import Booking from "../views/client/booking";

// routing
const HomePage = Loadable(lazy(() => import('views/client/home')));
const ManageBooking = Loadable(lazy(() => import('views/client/manage-booking')));
// const UtilsColor = Loadable(lazy(() => import('views/admin/utilities/Color')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/admin/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const ClientRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <HomePage />
    },
    {
      path: 'home',
      children: [
        {
          path: '',
          element: <HomePage />
        }
      ]
    },
    {
      path: 'booking',
      children: [
        {
          path: '',
          element: <Booking />
        }
      ]
    },
    {
      path: 'manage-booking',
      children: [
        {
          path: '',
          element: <ManageBooking />
        }
      ]
    }
    // {
    //   path: '',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // }
    //     {
    //         path: 'utils',
    //         children: [
    //             {
    //                 path: 'util-shadow',
    //                 element: <UtilsShadow />
    //             }
    //         ]
    //     },
    //     {
    //         path: 'icons',
    //         children: [
    //             {
    //                 path: 'tabler-icons',
    //                 element: <UtilsTablerIcons />
    //             }
    //         ]
    //     },
    //     {
    //         path: 'icons',
    //         children: [
    //             {
    //                 path: 'material-icons',
    //                 element: <UtilsMaterialIcons />
    //             }
    //         ]
    //     },
    //     {
    //         path: 'sample-page',
    //         element: <SamplePage />
    //     }
  ]
};

export default ClientRoutes;
