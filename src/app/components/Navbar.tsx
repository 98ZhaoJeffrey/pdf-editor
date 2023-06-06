import React from 'react'
import Searchbar from './Searchbar'
import { SlSettings } from "react-icons/sl";
import { MdAddCircleOutline } from "react-icons/md";
const Navbar = () => {
    return (
        <div className='w-full h-16 bg-slate-200 flex-none flex  justify-between'>
            <Searchbar />

            <div className='flex'>
                <button className='flex w-32 h-12 bg-slate-50 m-2 rounded-3xl hover:bg-slate-100 justify-center items-center'>
                    <h3 className='p-1'>Add Files </h3>
                    <MdAddCircleOutline size={20} />
                </button>

                <button className='w-12 h-12 rounded-full bg-slate-50 m-2 mr-5 pl-[0.85rem] hover:bg-slate-100'>
                    <SlSettings size={20} />
                </button>

                {/* User profile picture */}
                <img
                    src='https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg'
                    className='rounded-full h-14 w-14 object-cover m-1 mr-3'
                ></img>
            </div>
        </div>
    )
}

export default Navbar
