import React from 'react';
import SidebarLink from './SidebarLink';
import { MdAccessTimeFilled, MdAdd, MdCloudCircle, MdCreateNewFolder, MdLogout, MdPeopleAlt, MdStar } from 'react-icons/md';
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <div className='h-screen bg-stone-950 w-72 p-5 flex justify-between flex-col flex-none'>
            <h1 className='text-description text-slate-300'>Untitled</h1>
            <div className='flex flex-col gap-3'>
                <div>
                    <SidebarLink alt={true}> <MdAdd size={20} /> New File </SidebarLink>
                    <SidebarLink alt={true}> <MdCreateNewFolder size={20} /> New Folder </SidebarLink>
                </div>
                <hr></hr>
                <div>

                    <SidebarLink alt={false}> <MdCloudCircle size={20} /> All Files </SidebarLink>
                    <SidebarLink alt={false}> <MdAccessTimeFilled size={20} /> Recent </SidebarLink>
                    <SidebarLink alt={false}> <MdPeopleAlt size={20} /> Shared </SidebarLink>
                    <SidebarLink alt={false}> <MdStar size={20} /> Favourites </SidebarLink>
                </div>
            </div>

            <SignOutButton>
                <Link href="/">
                    <SidebarLink alt={false}> <MdLogout /> Log out </SidebarLink>
                </Link>
            </SignOutButton>

        </div>
    );
}

export default Sidebar;