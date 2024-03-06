import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export interface MainLayoutProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function MainLayout() {
    return (
        <div className='flex'>
            <Sidebar />
            <main className='w-5/6'>
                <Outlet />
            </main>
        </div>
    );
}
