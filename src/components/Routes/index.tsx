import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import Dashboard from '../../pages/Dashboard';
import { ProtectedRoute } from '../ProtectedRoute';
import Login from '../../pages/Login';
import MainLayout from '../../layouts/MainLayout';
import { NotFound } from '../../pages';
import Companies from '../../pages/Companies';
import Licences from '../../pages/Licences';

const Routes = () => {
    const { token }: any = useAuth();

    const routesForPublic = [
        {
            path: '/login',
            element: <Login />,
        },
    ];

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <MainLayout />,
                    children: [
                        {
                            index: true,
                            element: <Dashboard />,
                        },
                        {
                            path: 'companies',
                            element: <Companies />,
                        },
                        {
                            path: 'licences',
                            element: <Licences />,
                        },

                        {
                            path: '*',
                            element: <NotFound />,
                        },
                    ],
                },
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: '/login',
            element: <Login />,
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
