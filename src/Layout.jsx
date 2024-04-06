import React from 'react'
import Navbar from './component/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='w-screen h-screen bg-gray-100 dark:bg-gray-900'>
            <div className='w-full h-[10%]'>
                <Navbar />
            </div>
            <div className='w-full h-[90%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
