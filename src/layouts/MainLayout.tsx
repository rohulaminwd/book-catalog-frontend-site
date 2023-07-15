import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <div className="pt-16 pattern-bg h-screen">
                <Outlet />
            </div>
        </div>
    )
}
