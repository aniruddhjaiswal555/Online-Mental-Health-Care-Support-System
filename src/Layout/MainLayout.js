import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <main style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Outlet />
            </main>
        </div>
    );
}
export default MainLayout;
