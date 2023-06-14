import React from 'react';
import SidebarLink from './SidebarLink';
import { MdAccessTimeFilled, MdCloudCircle, MdLogout, MdPeopleAlt, MdStar } from 'react-icons/md';
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';

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
                    <SidebarLink> <MdCloudCircle size={20} /> My Drive </SidebarLink>
                    <SidebarLink> <MdAccessTimeFilled size={20} /> Recent </SidebarLink>
                    <SidebarLink> <MdPeopleAlt size={20} /> Shared </SidebarLink>
                    <SidebarLink> <MdStar size={20} /> Favourites </SidebarLink>
                </div>
            </div>

            <SignOutButton>
                <Link href="/">
                    <SidebarLink> <MdLogout /> Log out </SidebarLink>
                </Link>
            </SignOutButton>

        </div>
    );
}

export default Sidebar;