import React from 'react';
import SidebarLink from './SidebarLink';
import { MdAccessTimeFilled, MdCloudCircle, MdLogout, MdPeopleAlt, MdStar } from 'react-icons/md';
import { SignOutButton } from '@clerk/nextjs'
import AddFolderButton from '../Folder/AddFolderButton';
import AddFileButton from '../File/AddFileButton';

const Sidebar: React.FC = () => {

    return (
        <div className='h-screen bg-stone-950 w-72 p-5 flex justify-between flex-col flex-none'>
            <h1 className='text-description text-slate-300'>Untitled</h1>
            <div className='flex flex-col gap-3'>
                <div>
                    <AddFileButton />
                    <AddFolderButton />
                </div>
                <hr></hr>
                <div>
                    <SidebarLink to="/dashboard"> <MdCloudCircle size={20} /> My Drive </SidebarLink>
                    <SidebarLink to="/dashboard/recent"> <MdAccessTimeFilled size={20} /> Recent </SidebarLink>
                    <SidebarLink to="/dashboard/shared"> <MdPeopleAlt size={20} /> Shared </SidebarLink>
                    <SidebarLink to="/dashboard/favourite"> <MdStar size={20} /> Favourites </SidebarLink>
                </div>
            </div>

            <SignOutButton>
                <SidebarLink to="/"> <MdLogout /> Log out </SidebarLink>
            </SignOutButton>
        </div>
    );
}

export default Sidebar;