import React from 'react'
import Card from '../components/Card'


const page = () => {
    return (
        <div className='overflow-y-scroll h-screen flex flex-wrap'>
            {/* Displays all of the pdf files */}
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default page
