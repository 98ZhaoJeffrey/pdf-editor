import React from 'react'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
    return (
        <div className='h-screen bg-stone-950 w-72 p-5 flex justify-between flex-col flex-none'>
            <h1 className='text-description text-slate-300'>Untitled</h1>
            <div className='flex flex-col'>
                <SidebarLink title="Shared" />
                <SidebarLink title="All files" />
                <SidebarLink title="Favourites" />
                <SidebarLink title="Deleted" />
            </div>
            <SidebarLink title="Log out" />
        </div>
    )
}

export default Sidebar
