// import { lazy } from 'react';

// project imports
import MainLayout from 'layout/client/MainLayout';
import HomePage from '../views/client/home';
// import Loadable from 'ui-component/Loadable';

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/admin/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/admin/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/admin/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/admin/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/admin/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/admin/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/admin/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const ClientRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'home',
      element: <HomePage />
    }
    //     {
    //         path: 'dashboard',
    //         children: [
    //             {
    //                 path: 'default',
    //                 element: <DashboardDefault />
    //             }
    //         ]
    //     },
    //     {
    //         path: 'utils',
    //         children: [
    //             {
    //                 path: 'util-typography',
    //                 element: <UtilsTypography />
    //             }
    //         ]
    //     },
    //     {
    //         path: 'utils',
    //         children: [
    //             {
    //                 path: 'util-color',
    //                 element: <UtilsColor />
    //             }
    //         ]
    //     },
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
