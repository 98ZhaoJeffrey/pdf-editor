import React from 'react';
import Searchbar from './Searchbar';
import { SlSettings } from 'react-icons/sl';
import { UserButton } from '@clerk/nextjs'


const Navbar: React.FC = () => {
    return (
        <div className='pl-10 w-full h-16 bg-slate-200 flex-none flex justify-between'>
            <Searchbar />

            <div className='flex'>
                <button className='w-10 h-10 rounded-full bg-slate-100 my-3 mr-5 pl-[0.65rem] hover:bg-slate-300'>
                    <SlSettings size={20} />
                </button>

                {/* User profile picture */}
                <div className='my-4 mr-3'>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{}}
                    />
                </div>

            </div>
        </div>
    );
}

export default Navbar;