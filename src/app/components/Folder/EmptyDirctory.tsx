import React from 'react'

function EmptyDirctory() {
    return (
        <div className='w-full h-[60vh] flex flex-col justify-center items-center -mt-5 -ml-14'>
            <h1 className='text-xl'>
                This directory is empty
            </h1>
            <br></br>
            <h1>
                You can add new file/folder using the sidebar
            </h1>
        </div>
    )
}

export default EmptyDirctory
