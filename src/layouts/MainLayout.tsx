import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <div className='bg-base-200'>
            <Navbar />
            <div className="pt-2">
                <Outlet />
            </div>
        </div>
    )
}
