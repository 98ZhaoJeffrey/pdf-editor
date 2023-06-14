import React from 'react'
import { MdAdd } from 'react-icons/md'

function AddFileButton() {
    return (
        <button className='text-white w-full text-center p-5 rounded-xl hover:bg-emerald-600 hover:text-white font-medium'>
            <div className='flex items-center justify-start gap-3'>
                <MdAdd size={20} /> New File
            </div>
        </button>
    )
}

export default AddFileButton