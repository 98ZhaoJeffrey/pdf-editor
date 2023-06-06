import React from 'react'
import FolderCard from '../components/FolderCard'
import PDFCard from '../components/PDFCard'


const page = () => {
    return (
        <div className='pt-5 pl-14'>
            <h1 className='text-title mb-10'>Shared</h1>
            {/* Displays all of the pdf files */}
            <div className='overflow-y-scroll h-[80vh]'>
                <div className='flex flex-row flex-wrap gap-7'>
                    <FolderCard />
                    <FolderCard />
                    <FolderCard />
                    <FolderCard />
                    <FolderCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                    <PDFCard />
                </div>
            </div>
        </div>
    )
}

export default page
