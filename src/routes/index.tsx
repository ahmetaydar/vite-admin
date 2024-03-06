import MainLayout from '../layouts/MainLayout';
import { LoginPage } from '../pages';

export const routes: any = [
    {
        path: '/login',
        element: <LoginPage />,
        isPrivate: false,
    },
    {
        path: '/*',
        element: <LoginPage />,
        isPrivate: false,
    },
];

export const authRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        isPrivate: true,
    },
];
